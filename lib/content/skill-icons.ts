/**
 * Skill marks for the pills in the Skills section (spec §8.6).
 *
 * Two kinds of mark, and the distinction is the whole point:
 *
 * - **Official product logos** keep the vendor's own artwork *and its own colours*. Some are
 *   inline multi-colour SVG (C, LabVIEW, LTspice); Python's and MATLAB's are gradient
 *   renders that cannot be expressed as flat vector fills, so those two ship as trimmed
 *   raster assets under `public/images/skills/` and go through `next/image`.
 * - **Concept marks** are for skills no vendor mark exists for - fields of study, an
 *   instrument category, the soft skills. These carry no `fill`, so `SkillBadge` paints them
 *   in the site accent, which is what visually separates "a tool I use" from "something I know".
 *
 * Sources: Material Design Icons (Apache-2.0) for concepts with a good stock glyph; Simple
 * Icons (CC0) for LTspice; the owner supplied the C, LabVIEW, Python and MATLAB artwork.
 * Four concept marks are authored here because MDI has no apt glyph - see each one's note.
 *
 * Rendering contract: `SkillBadge` paints inline marks at 16px. Authored marks carve holes by
 * reverse-winding a subpath under the default `nonzero` rule; a mark whose source artwork
 * needs `evenodd` (C's ring) declares `fillRule` on the mark instead.
 *
 * Do not redraw a *product* logo by hand. Take the vendor's file, and crop with `viewBox`
 * rather than editing path data.
 */

import type { StaticImageData } from "next/image";

import matlabLogo from "@/public/images/skills/matlab.png";
import pythonLogo from "@/public/images/skills/python.png";

// ── Official logos: inline vector, vendor colours ─────────────────────────────

/** C - the hexagon-and-ring mark. Every subpath is `evenodd` in the source; the ring
 *  depends on it, so the mark declares `fillRule` rather than rewinding the circles. */
const C_LOGO = [
    { d: "m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z", fill: "#004482" },
    { d: "m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z", fill: "#659ad2" },
    { d: "m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z", fill: "#ffffff" },
    { d: "m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z", fill: "#00599c" },
] as const;

/** LabVIEW - the run-arrow glyph: yellow arrow, black plus. The arrow gets a thin dark
 *  outline (absent from the source) because its brand yellow is close in lightness to
 *  the pill fill and all but disappears without one. 12 units in this ~396-unit
 *  viewBox renders as well under 1px at the pill's 16px size - a hairline, not a
 *  cartoon outline. */
const LABVIEW_LOGO = [
    { d: "M371.577 168.249L43.417.636S21.973-2.056 13.128 3.64C3.375 9.92 0 30.927 0 30.927v335.227s3.023 24.975 13.126 31.303c11.407 7.144 38.37-3.031 38.37-3.031l323.11-165.594s21.204-13.126 21.204-31.301-24.233-29.282-24.233-29.282z", fill: "#ffda1c", stroke: "#00000055", strokeWidth: 12 },
    { d: "M125.205 182.362v-38.37h27.263v38.37h39.379v27.262h-39.379v37.36h-27.263v-37.36H84.816v-27.262z", fill: "#000" },
] as const;

/** LTspice - the official stylised "LT" mark (Analog Devices), in its brand crimson. */
const LTSPICE = "M9.3267 3.4848c-.7965.627-.9744 1.6212-1.1644 3.3173-.3653 3.257-.641 5.1982-1.0473 8.658-.199 1.7013.9756 1.9015 2.3646 1.8861h2.8841c.2604.002.3525.1229.3193.3807-.1241.9654-.2579 2.7882-1.19 2.7882L0 20.4933s2.8304-1.032 3.165-3.3723L4.5047 6.234c.2086-1.357 1.2885-2.7492 2.634-2.7492h2.188zm5.5567 17.0306c1.3454 0 2.4254-1.3922 2.634-2.7491L18.857 6.8792c.3346-2.3404 3.165-3.3723 3.165-3.3723L10.529 3.485c-.9321 0-1.0658 1.8228-1.19 2.7882-.0332.2578.0589.3787.3193.3806h2.8841c1.389-.0153 2.5636.185 2.3646 1.8861-.4062 3.46-.682 5.401-1.0473 8.6581-.19 1.696-.3679 2.6903-1.1644 3.3173h2.188zM23.202 6.6528c.259.0006.4964-.2092.5284-.4658l.2662-2.2309c.0313-.2565-.1549-.4715-.4133-.4715h-.8797c-1.0883 0-2.2022 1.7952-2.2559 2.696-.0339.2585.151.4696.4114.4722h2.3429z";

// ── Bench instruments (authored - no vendor owns the instrument category) ──────

// Oscilloscope - a benchtop chassis whose screen (reverse-wound, so it reads as a hole)
// carries a live sine trace, with two control knobs on the right panel and a vent slot below.
const OSCILLOSCOPE =
  "M 3.4 3.8 H 20.6 A 2 2 0 0 1 22.6 5.8 V 18.2 A 2 2 0 0 1 20.6 20.2 H 3.4 A 2 2 0 0 1 1.4 18.2 V 5.8 A 2 2 0 0 1 3.4 3.8 Z M 3.1 5.5 V 14.4 H 16.3 V 5.5 H 3.1 Z M 4 9.05 Q 6.85 3.05 9.7 9.05 Q 12.55 15.05 15.4 9.05 L 15.4 10.85 Q 12.55 16.85 9.7 10.85 Q 6.85 4.85 4 10.85 Z M 17.9 8.2 A 1.5 1.5 0 1 0 20.9 8.2 A 1.5 1.5 0 1 0 17.9 8.2 Z M 17.9 12.6 A 1.5 1.5 0 1 0 20.9 12.6 A 1.5 1.5 0 1 0 17.9 12.6 Z M 6 16.2 V 18.4 H 17.8 V 16.2 H 6 Z";

// Signal generators - the IEC schematic symbol for an AC source: a ring enclosing one cycle
// of a sine. Chosen over a second instrument chassis so it cannot be mistaken for the
// oscilloscope at 16px, and it shares the schematic-symbol language of the resistor and diode.
const SIGNAL_GENERATOR =
  "M 1 12 A 11 11 0 1 1 23 12 A 11 11 0 1 1 1 12 Z M 3.2 12 A 8.8 8.8 0 1 0 20.8 12 A 8.8 8.8 0 1 0 3.2 12 Z M 4.4 10.9 Q 8.2 5.1 12 10.9 Q 15.8 16.7 19.6 10.9 L 19.6 13.1 Q 15.8 18.9 12 13.1 Q 8.2 7.3 4.4 13.1 Z";

// ── Engineering concepts ──────────────────────────────────────────────────────

// Circuits - a resistor between two terminal nodes. Authored: MDI's `resistor-nodes` draws
// its zigzag with an off-centre diagonal tail that reads as a broken squiggle at 16px. This
// one is a symmetric 4-peak zigzag, mitre-stroked to a solid 1.9-unit band, with leads and
// two node discs so it reads as a circuit element rather than a scribble.
const CIRCUIT =
  "M 0 12 A 2 2 0 1 1 4 12 A 2 2 0 1 1 0 12 Z M 3.4 11.05 H 5.9 V 12.95 H 3.4 Z M 6.66 12.41 L 7.52 10.57 L 10.6 18.18 L 13.6 10.57 L 16.52 18.17 L 19.26 12.41 L 17.54 11.59 L 16.68 13.43 L 13.6 5.82 L 10.6 13.43 L 7.68 5.83 L 4.94 11.59 Z M 18.3 11.05 H 20.8 V 12.95 H 18.3 Z M 20 12 A 2 2 0 1 1 24 12 A 2 2 0 1 1 20 12 Z";

// Semiconductors - the diode symbol (anode lead, triangle, cathode bar, cathode lead): the PN
// junction, i.e. the elemental semiconductor device. MDI has no transistor or diode glyph, and
// four solid primitives survive 16px better than a BJT's fine leads.
const DIODE =
  "M 1.3 11.1 H 6.4 V 12.9 H 1.3 Z M 6.4 4.9 L 16.4 12 L 6.4 19.1 Z M 16.4 4.6 H 18.6 V 19.4 H 16.4 Z M 18.6 11.1 H 22.7 V 12.9 H 18.6 Z";

// Microelectronics - a packaged integrated circuit with its pins and die (MDI memory).
const IC_CHIP =
  "M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z";

// Electro-Optics - a ray diagram: collimated light entering a convex lens and converging on a
// focal point. Authored because MDI's optical glyphs are all lamps and pointers, which read as
// "lighting" rather than as the optics half of electro-optics. Two rays per side, and a
// ~0.65-unit air gap on each lens face (its cubics reach x 5.68-10.33, the rays stop at 5 and
// start at 11), so at 16px the lens stays separate instead of fusing into an arrowhead.
const ELECTRO_OPTICS =
  "M 8 2.8 C 11.1 8.32 11.1 15.68 8 21.2 C 4.9 15.68 4.9 8.32 8 2.8 Z M 0.4 6.4 H 5 V 8.7 H 0.4 Z M 0.4 15.3 H 5 V 17.6 H 0.4 Z M 11 6.4 L 20.2 10.8 L 20.2 12.6 L 11 8.7 Z M 11 17.6 L 20.2 13.2 L 20.2 11.4 L 11 15.3 Z M 19.2 12 A 2 2 0 1 1 23.2 12 A 2 2 0 1 1 19.2 12 Z";

// Signal Processing - a sampled waveform's envelope (MDI waveform).
const WAVEFORM =
  "M22 12L20 13L19 14L18 13L17 16L16 13L15 21L14 13L13 15L12 13L11 17L10 13L9 22L8 13L7 19L6 13L5 14L4 13L2 12L4 11L5 10L6 11L7 5L8 11L9 2L10 11L11 7L12 11L13 9L14 11L15 3L16 11L17 8L18 11L19 10L20 11L22 12Z";

// Control - the closed feedback loop, the defining structure of a control system (MDI
// autorenew). A literal block diagram needs strokes too fine to survive 16px.
const FEEDBACK_LOOP =
  "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";

// Communication Systems - a transmitting antenna (MDI antenna).
const ANTENNA =
  "M12 7.5C12.69 7.5 13.27 7.73 13.76 8.2S14.5 9.27 14.5 10C14.5 11.05 14 11.81 13 12.28V21H11V12.28C10 11.81 9.5 11.05 9.5 10C9.5 9.27 9.76 8.67 10.24 8.2S11.31 7.5 12 7.5M16.69 5.3C17.94 6.55 18.61 8.11 18.7 10C18.7 11.8 18.03 13.38 16.69 14.72L15.5 13.5C16.5 12.59 17 11.42 17 10C17 8.67 16.5 7.5 15.5 6.5L16.69 5.3M6.09 4.08C4.5 5.67 3.7 7.64 3.7 10S4.5 14.3 6.09 15.89L4.92 17.11C3 15.08 2 12.7 2 10C2 7.3 3 4.94 4.92 2.91L6.09 4.08M19.08 2.91C21 4.94 22 7.3 22 10C22 12.8 21 15.17 19.08 17.11L17.91 15.89C19.5 14.3 20.3 12.33 20.3 10S19.5 5.67 17.91 4.08L19.08 2.91M7.31 5.3L8.5 6.5C7.5 7.42 7 8.58 7 10C7 11.33 7.5 12.5 8.5 13.5L7.31 14.72C5.97 13.38 5.3 11.8 5.3 10C5.3 8.2 5.97 6.64 7.31 5.3Z";

// ── Soft skills ───────────────────────────────────────────────────────────────

// Problem-Solving - owner-supplied puzzle-piece artwork (SVG Repo, single-path, originally
// the green Twemoji puzzle-piece emoji). Used at its own viewBox rather than rescaled into
// BOX_24, and with its emoji fill dropped so it paints in the site accent like every other
// concept mark instead of carrying its own colour.
const PUZZLE =
  "M26.093 4.612c-.498.498-.629.839-.728 1.029c-.66 1.266-1.455 1.676-2.78.351c-.13-.13-4.087-4.267-4.741-5.017c-.427-.49-1.081-.64-1.584-.262c-.38.286-4.035 3.273-5.035 4.507c-.774.955-.8 2.134-.079 2.856c.326.326.727.449 1.151.578c.552.169 1.763.068 2.47.775c1.133 1.133.54 2.924-.917 4.421c-1.497 1.457-3.288 2.05-4.421.917c-.708-.708-.606-1.918-.775-2.47c-.129-.424-.252-.824-.578-1.151c-.721-.721-1.9-.694-2.856.079c-1.235 1-4.221 4.655-4.507 5.035c-.379.503-.228 1.156.262 1.584c.75.654 4.887 4.611 5.017 4.741c1.324 1.324.915 2.12-.351 2.78c-.19.099-.53.229-1.029.728a3.744 3.744 0 0 0 5.295 5.295c.498-.498.629-.839.728-1.029c.66-1.266 1.455-1.676 2.78-.351c.13.13 4.087 4.267 4.741 5.017c.427.49 1.081.64 1.584.262c.38-.286 4.035-3.273 5.035-4.507c.774-.955.8-2.134.079-2.856c-.326-.326-.727-.449-1.151-.578c-.552-.169-1.763-.068-2.47-.775c-1.133-1.133-.54-2.924.917-4.421c1.497-1.457 3.288-2.05 4.421-.917c.708.708.606 1.918.775 2.47c.129.424.252.824.578 1.151c.721.721 1.9.694 2.856-.079c1.235-1 4.221-4.655 4.507-5.035c.379-.503.228-1.156-.262-1.584c-.75-.654-4.887-4.611-5.017-4.741c-1.324-1.324-.915-2.12.351-2.78c.19-.099.53-.229 1.029-.728a3.744 3.744 0 0 0-5.295-5.295z";

// Teamwork - a group (MDI account-group).
const ACCOUNT_GROUP =
  "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z";

// Self-Learning - an open book (MDI book-open-page-variant). Deliberately not a graduation cap:
// the skill is self-directed study, not a conferred qualification.
const BOOK_OPEN =
  "M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z";

// Responsibility - a shield with a check (MDI shield-check): something entrusted and discharged.
const SHIELD_CHECK =
  "M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z";

// Initiative - a launch (MDI rocket-launch): starting something under one's own power.
const ROCKET_LAUNCH =
  "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z";

// ── View boxes ────────────────────────────────────────────────────────────────

/** The 24-unit box MDI and the authored marks are drawn in. */
const BOX_24 = "0 0 24 24";
/** The boxes the owner's C and LabVIEW artwork were authored in - used verbatim. */
const BOX_C = "0 0 38.000089 42.000031";
const BOX_LABVIEW = "0 -2.056 395.81 406.657";
/** The box the owner's puzzle-piece artwork was authored in. */
const BOX_PUZZLE = "0 0 36 36";

// ── Registry ──────────────────────────────────────────────────────────────────

/** One shape in an inline mark. `fill` omitted means "paint it in the site accent". */
export interface SkillPath {
  d: string;
  fill?: string;
  /** Outline colour - set only where the fill alone doesn't read against the pill
   *  (LabVIEW's brand yellow is close in lightness to the pill fill). */
  stroke?: string;
  /** In the mark's own viewBox units, not px - scales with the artwork. */
  strokeWidth?: number;
}

/** A resolved skill mark: either inline vector, or a raster logo for `next/image`. */
export type SkillMark =
  | {
      kind: "svg";
      viewBox: string;
      paths: readonly SkillPath[];
      /** Set only when the source artwork depends on it; inherits to every path. */
      fillRule?: "evenodd";
    }
  | { kind: "image"; src: StaticImageData };

/** Shorthand: a single accent-filled path in the 24-unit box. */
const concept = (d: string): SkillMark => ({ kind: "svg", viewBox: BOX_24, paths: [{ d }] });

/**
 * Skill name → mark, keyed exactly as in `data/skills.ts`. A skill missing from here falls
 * back to its initial in `SkillBadge`, so an unmapped skill degrades gracefully.
 */
export const SKILL_MARKS: Record<string, SkillMark> = {
  // Programming & Tools - official logos in the vendor's own colours.
  Python: { kind: "image", src: pythonLogo },
  C: { kind: "svg", viewBox: BOX_C, paths: C_LOGO, fillRule: "evenodd" },
  Matlab: { kind: "image", src: matlabLogo },
  LabVIEW: { kind: "svg", viewBox: BOX_LABVIEW, paths: LABVIEW_LOGO },
  LTspice: { kind: "svg", viewBox: BOX_24, paths: [{ d: LTSPICE, fill: "#900028" }] },

  // Lab & Instrumentation - authored; no vendor owns an instrument category.
  Oscilloscope: concept(OSCILLOSCOPE),
  "Signal Generators": concept(SIGNAL_GENERATOR),

  // Engineering Knowledge - fields of study, not products.
  Circuits: concept(CIRCUIT),
  Semiconductors: concept(DIODE),
  Microelectronics: concept(IC_CHIP),
  "Electro-Optics": concept(ELECTRO_OPTICS),
  "Signal Processing": concept(WAVEFORM),
  Control: concept(FEEDBACK_LOOP),
  "Communication Systems": concept(ANTENNA),

  // Soft Skills.
  "Problem-Solving": { kind: "svg", viewBox: BOX_PUZZLE, paths: [{ d: PUZZLE }] },
  Teamwork: concept(ACCOUNT_GROUP),
  "Self-Learning": concept(BOOK_OPEN),
  Responsibility: concept(SHIELD_CHECK),
  Initiative: concept(ROCKET_LAUNCH),
};

export function getSkillMark(skillName: string): SkillMark | null {
  return SKILL_MARKS[skillName] ?? null;
}
