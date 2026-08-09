/**
 * Canonical absolute origin of the deployed site, without a trailing slash.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` - explicit override (custom domain, staging host).
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` - injected by Vercel into every build and
 *     always pointing at the project's *production* domain, so preview builds
 *     emit the same canonical URL as production. Keeping this ahead of any
 *     hardcoded host means renaming the Vercel project (or attaching a custom
 *     domain) can't leave a stale, dead origin behind.
 *  3. `http://localhost:3000` - local development.
 *
 * This is not only about canonical links: `metadataBase` is what turns the
 * file-convention OG image into the absolute `og:image` URL, and link unfurlers
 * (WhatsApp, Slack, Notion) silently fall back to the favicon - or to a stale
 * cached preview - when that URL does not resolve.
 *
 * Server-only: `VERCEL_PROJECT_PRODUCTION_URL` is not `NEXT_PUBLIC_`-prefixed,
 * so it is inlined as `undefined` in client bundles. Import this from server
 * components, `metadata` exports and route handlers only.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionHost) {
    // Vercel supplies a bare host (`example.vercel.app`); Open Graph requires an
    // absolute URL, and Vercel serves every deployment over TLS.
    return `https://${vercelProductionHost.replace(/\/+$/, "")}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Canonical homepage URL (`og:url`), i.e. the origin with a trailing slash. */
export const homepageUrl = `${siteUrl}/`;
