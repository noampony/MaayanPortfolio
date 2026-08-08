#!/usr/bin/env node
/**
 * Regenerates the Open Graph / Twitter preview image from a real screenshot of
 * the live Hero section.
 *
 * The preview image is a committed static asset rather than a generated one:
 * `next/og` (satori) does not support the blurred wash backdrop, the masked
 * portrait ellipse or the glass tags the Hero is built from, so anything drawn
 * at request time would only approximate the section. A screenshot is the real
 * thing - the cost is that this script has to be re-run whenever the Hero
 * changes visually.
 *
 * Usage (the URL must be a *production* build - `next dev` injects its own
 * dev-tools indicator into the corner of the page):
 *
 *   pnpm build && pnpm exec next start -p 3100
 *   node scripts/generate-og-image.mjs http://localhost:3100/
 *
 * Dependency-free by design: it drives the locally installed Chrome over the
 * DevTools protocol using Node's built-in WebSocket client, so no browser
 * automation package has to be added to the project (see AGENTS.md).
 * Override the browser binary with CHROME_PATH if Chrome lives elsewhere.
 */
import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** WhatsApp/Facebook read 1200x630 (1.91:1) as a large preview card. */
const WIDTH = 1200;
const HEIGHT = 630;

/**
 * WhatsApp drops the preview image entirely above 600KB, so the capture is JPEG
 * rather than PNG: the Hero is mostly a photographic portrait over a soft
 * gradient, which PNG encodes at ~590KB (right on the limit) and JPEG at a
 * fraction of that with no visible loss at preview size.
 */
const MAX_BYTES = 600 * 1024;
const JPEG_QUALITY = 92;

const OUTPUT_FILES = ["app/opengraph-image.jpg", "app/twitter-image.jpg"];

const DEFAULT_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/**
 * Floating page furniture that reads as a stray control in a still image. Hidden
 * for the capture only, by injecting a stylesheet into the page - the site's own
 * CSS stays free of screenshot concerns.
 */
const HIDE_SELECTORS = [
  ".business-card-trigger", // always-on "Reach Out" business-card launcher
];

/** Milliseconds to let fonts, the portrait and the entrance animations settle. */
const SETTLE_MS = 1500;

function fail(message) {
  console.error(`generate-og-image: ${message}`);
  process.exit(1);
}

/** Minimal CDP client over the browser's WebSocket endpoint. */
class CdpSession {
  #socket;
  #nextId = 1;
  #pending = new Map();

  constructor(socket) {
    this.#socket = socket;
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      const pending = this.#pending.get(message.id);
      if (!pending) return; // an event, not a command result
      this.#pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(message.error.message));
      } else {
        pending.resolve(message.result);
      }
    });
  }

  static async connect(webSocketDebuggerUrl) {
    const socket = new WebSocket(webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", () => reject(new Error("CDP socket failed")), {
        once: true,
      });
    });
    return new CdpSession(socket);
  }

  send(method, params = {}) {
    const id = this.#nextId++;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.#socket.close();
  }
}

/** Polls Chrome's HTTP debugging endpoint until it reports a page target. */
async function waitForDebuggerTarget(port, timeoutMs = 20_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome has not opened the port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("Chrome did not expose a DevTools page target in time");
}

/**
 * Polls `document.readyState` instead of subscribing to `Page.loadEventFired`,
 * which keeps the CDP client to command/response only (no event plumbing).
 */
async function waitForDocumentComplete(session, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { result } = await session.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (result.value === "complete") return;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("page did not finish loading in time");
}

async function main() {
  const targetUrl = process.argv[2] ?? "http://localhost:3100/";
  const chromePath = process.env.CHROME_PATH ?? DEFAULT_CHROME;

  // An ephemeral profile keeps the capture reproducible and never touches the
  // developer's real Chrome profile, cookies or sessions.
  const userDataDir = await mkdtemp(path.join(tmpdir(), "og-capture-"));
  const port = 9333;

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      // The debugging port is only open for the few seconds this script runs,
      // and it is pinned to loopback with a throwaway profile, so nothing on the
      // network can drive the browser and it holds no credentials or sessions.
      `--remote-debugging-port=${port}`,
      "--remote-debugging-address=127.0.0.1",
      `--user-data-dir=${userDataDir}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "--hide-scrollbars",
      // Renders the Hero in its settled state instead of mid-entrance: the
      // typewriter, the staggered reveals and the tag springs all short-circuit
      // under reduced motion, which is what makes the capture deterministic.
      "--force-prefers-reduced-motion",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "about:blank",
    ],
    // Chrome's stderr is pure startup noise; piping it without a reader risks
    // stalling the child on a full pipe.
    { stdio: "ignore" },
  );

  chrome.on("error", (error) => fail(`could not launch Chrome (${chromePath}): ${error.message}`));

  let session;
  try {
    session = await CdpSession.connect(await waitForDebuggerTarget(port));

    await session.send("Page.enable");
    await session.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await session.send("Page.navigate", { url: targetUrl });
    await waitForDocumentComplete(session);
    await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));

    const { result } = await session.send("Runtime.evaluate", {
      expression: `(() => {
        const style = document.createElement("style");
        style.textContent = ${JSON.stringify(
          `${HIDE_SELECTORS.join(", ")} { display: none !important; }`,
        )};
        document.head.append(style);
        return document.title;
      })()`,
      returnByValue: true,
    });

    if (!result.value) {
      throw new Error(`page at ${targetUrl} rendered no title - is the server running?`);
    }

    // Waiting on the font set (rather than a fixed delay) is what keeps the Hero
    // headline from being captured in the fallback face.
    await session.send("Runtime.evaluate", {
      expression: "document.fonts.ready.then(() => true)",
      awaitPromise: true,
      returnByValue: true,
    });

    const { data } = await session.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: JPEG_QUALITY,
      captureBeyondViewport: false,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });

    const screenshot = Buffer.from(data, "base64");
    if (screenshot.byteLength > MAX_BYTES) {
      throw new Error(
        `screenshot is ${(screenshot.byteLength / 1024).toFixed(0)}KB, over WhatsApp's 600KB preview limit - lower JPEG_QUALITY`,
      );
    }

    for (const relativePath of OUTPUT_FILES) {
      await writeFile(path.join(repoRoot, relativePath), screenshot);
      console.log(
        `generate-og-image: wrote ${relativePath} (${(screenshot.byteLength / 1024).toFixed(0)}KB, ${WIDTH}x${HEIGHT})`,
      );
    }
  } finally {
    session?.close();
    // Chrome has to have fully exited before the profile directory can go: it
    // keeps writing into it while shutting down, which otherwise fails the
    // cleanup with ENOTEMPTY.
    const exited = new Promise((resolve) => chrome.once("exit", resolve));
    chrome.kill();
    await exited;
    await rm(userDataDir, { recursive: true, force: true });
  }
}

await main().catch((error) => fail(error.message));
