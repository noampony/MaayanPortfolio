/**
 * Skill marks for the pills in the Skills section (spec §8.6).
 *
 * Every skill in `data/skills.ts` resolves to a mark here. Three tiers, in order of
 * preference:
 *
 * 1. **Official brand marks** for the products and languages - taken verbatim from
 *    Simple Icons (CC0 1.0) or devicon (MIT), never redrawn by hand. Where the source
 *    ships a lockup rather than a bare glyph (LabVIEW) the glyph is isolated with a
 *    cropped `viewBox`, not by editing the path data.
 * 2. **Material Design Icons** (Apache-2.0) for concepts a vendor mark does not exist
 *    for - the professionally drawn glyph beats anything hand-rolled at 16px.
 * 3. **Authored marks** for the handful MDI has no glyph for: the two bench
 *    instruments, the diode, and the electro-optics diagram. These are built from
 *    primitives (rects, arcs, quadratic arches) so they stay legible at 16px.
 *
 * Rendering contract: `SkillBadge` paints every path of a mark in one flat colour at
 * 16px, using the default `nonzero` fill rule. So authored marks carve their holes by
 * reverse-winding a subpath, and multi-path marks rely on same-colour overlap for
 * union rather than on fill-rule interactions.
 *
 * Do not hand-write path data for a *product*. Take it from the vendor, Simple Icons
 * or devicon, and crop with `viewBox` if the source is a lockup.
 */

// ── Official brand marks (Simple Icons, CC0 1.0) ──────────────────────────────

// Python - the official two-snake mark.
const PYTHON =
  "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z";

// C - the mark from the ISO C standard's cover art, as Simple Icons ships it.
const C =
  "M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z";

// LTspice - the official stylised "LT" mark (Analog Devices).
const LTSPICE =
  "M9.3267 3.4848c-.7965.627-.9744 1.6212-1.1644 3.3173-.3653 3.257-.641 5.1982-1.0473 8.658-.199 1.7013.9756 1.9015 2.3646 1.8861h2.8841c.2604.002.3525.1229.3193.3807-.1241.9654-.2579 2.7882-1.19 2.7882L0 20.4933s2.8304-1.032 3.165-3.3723L4.5047 6.234c.2086-1.357 1.2885-2.7492 2.634-2.7492h2.188zm5.5567 17.0306c1.3454 0 2.4254-1.3922 2.634-2.7491L18.857 6.8792c.3346-2.3404 3.165-3.3723 3.165-3.3723L10.529 3.485c-.9321 0-1.0658 1.8228-1.19 2.7882-.0332.2578.0589.3787.3193.3806h2.8841c1.389-.0153 2.5636.185 2.3646 1.8861-.4062 3.46-.682 5.401-1.0473 8.6581-.19 1.696-.3679 2.6903-1.1644 3.3173h2.188zM23.202 6.6528c.259.0006.4964-.2092.5284-.4658l.2662-2.2309c.0313-.2565-.1549-.4715-.4133-.4715h-.8797c-1.0883 0-2.2022 1.7952-2.2559 2.696-.0339.2585.151.4696.4114.4722h2.3429z";

// LabVIEW - the official run-arrow glyph. Simple Icons ships it as a lockup (glyph
// above the "LabVIEW" wordmark), and the wordmark is illegible mush at 16px, so only
// the glyph's two subpaths are kept here and `BOX_LABVIEW` crops to their bounds.
// The path data itself is unmodified.
const LABVIEW =
  "M9.176 4.469a.817.817 0 00-.768.816v7.055a.816.816 0 001.182.73l7.058-3.527a.818.818 0 000-1.463L9.59 4.553a.808.808 0 00-.414-.084zm1.918 3.107h.638v.916h.916v.639h-.916v.918h-.638V9.13h-.918v-.639h.918v-.916z";

// ── Official brand mark (devicon, MIT) ────────────────────────────────────────

// MATLAB - the official "membrane" mark. Not in Simple Icons, and devicon draws it as
// three gradient-filled paths. Concatenating them into one path makes the overlaps
// cancel under `nonzero` and shreds the silhouette, so they stay three paths and
// `SkillBadge` paints them all in one colour - same-colour overlap unions cleanly.
const MATLAB = [
  "M8 70.2l31.879-12.88a82.62 82.62 0 0110.883-11.8c2.636-1.399 7.597-.641 16.68-11.918 8.796-11 11.597-20.403 15.718-20.403 6.52 0 11.32 14.082 18.602 35.403A461.75 461.75 0 00120 96.48c-7.602-7.082-14.078-14.718-21.48-14.52-6.88.161-14.52 8.321-22.88 18.802C69 109.16 60.2 114.922 56.763 114.8c0 0-8.883-25.121-16.32-29.2a10.563 10.563 0 00-9.563.797L8 70.16zm0 0",
  "M79.2 16.078c-2.68 3.602-5.92 10.203-11.76 17.524-9.082 11.277-14 10.52-16.68 11.918a78.673 78.673 0 00-10.882 11.8l13.2 9.64C64.28 51.68 70.28 35.122 74.96 24.399a54.649 54.649 0 014.238-8.32zm0 0",
  "M83.2 13.2c-8.72 0-14.68 45.921-46.88 71.562 9.04-1.48 16.88 20.957 20.48 30.039 16-2.723 28.802-33.32 41.72-32.84 7.402.277 13.878 7.437 21.48 14.52C102.64 60 94.52 13.198 83.2 13.198zm0 0",
] as const;

// ── Bench instruments (authored - no vendor owns the instrument category) ──────

// Oscilloscope - the instrument itself: a benchtop chassis whose screen (reverse-wound
// so it reads as a hole) carries a live sine trace, with two control knobs on the right
// panel and a vent slot below. The trace is a band of two quadratic arches; the knobs
// and vent are reverse-wound holes.
const OSCILLOSCOPE =
  "M 3.4 3.8 H 20.6 A 2 2 0 0 1 22.6 5.8 V 18.2 A 2 2 0 0 1 20.6 20.2 H 3.4 A 2 2 0 0 1 1.4 18.2 V 5.8 A 2 2 0 0 1 3.4 3.8 Z M 3.1 5.5 V 14.4 H 16.3 V 5.5 H 3.1 Z M 4 9.05 Q 6.85 3.05 9.7 9.05 Q 12.55 15.05 15.4 9.05 L 15.4 10.85 Q 12.55 16.85 9.7 10.85 Q 6.85 4.85 4 10.85 Z M 17.9 8.2 A 1.5 1.5 0 1 0 20.9 8.2 A 1.5 1.5 0 1 0 17.9 8.2 Z M 17.9 12.6 A 1.5 1.5 0 1 0 20.9 12.6 A 1.5 1.5 0 1 0 17.9 12.6 Z M 6 16.2 V 18.4 H 17.8 V 16.2 H 6 Z";

// Signal generators - the IEC schematic symbol for an AC source: a ring enclosing one
// cycle of a sine. Chosen over drawing a second instrument chassis so it cannot be
// mistaken for the oscilloscope at 16px, and it sits in the same schematic-symbol
// language as the resistor and diode marks below. Ring bore and nothing else is a hole.
const SIGNAL_GENERATOR =
  "M 1 12 A 11 11 0 1 1 23 12 A 11 11 0 1 1 1 12 Z M 3.2 12 A 8.8 8.8 0 1 0 20.8 12 A 8.8 8.8 0 1 0 3.2 12 Z M 4.4 10.9 Q 8.2 5.1 12 10.9 Q 15.8 16.7 19.6 10.9 L 19.6 13.1 Q 15.8 18.9 12 13.1 Q 8.2 7.3 4.4 13.1 Z";

// ── Engineering concepts ──────────────────────────────────────────────────────

// Circuits - a resistor between two nodes (MDI resistor-nodes).
const RESISTOR_NODES =
  "M2,11H3.67C4.08,9.83 5.19,9 6.5,9A3,3 0 0,1 9.5,12C9.5,12.65 9.29,13.25 8.94,13.74L10.07,15.35L13.11,4L14.61,6.13L16.7,9.11L17.5,9C18.81,9 19.92,9.83 20.33,11H22V13H20.33C19.92,14.17 18.81,15 17.5,15A3,3 0 0,1 14.5,12C14.5,11.35 14.71,10.75 15.06,10.26L13.93,8.65L10.89,20L7.3,14.89C7.05,14.96 6.78,15 6.5,15C5.19,15 4.08,14.17 3.67,13H2V11M17.5,10.5A1.5,1.5 0 0,0 16,12A1.5,1.5 0 0,0 17.5,13.5A1.5,1.5 0 0,0 19,12A1.5,1.5 0 0,0 17.5,10.5M6.5,10.5A1.5,1.5 0 0,0 5,12A1.5,1.5 0 0,0 6.5,13.5A1.5,1.5 0 0,0 8,12A1.5,1.5 0 0,0 6.5,10.5Z";

// Semiconductors - the diode symbol (anode lead, triangle, cathode bar, cathode lead):
// the PN junction, i.e. the elemental semiconductor device. MDI has no transistor or
// diode glyph, and four solid primitives survive 16px better than a BJT's fine leads.
const DIODE =
  "M 1.3 11.1 H 6.4 V 12.9 H 1.3 Z M 6.4 4.9 L 16.4 12 L 6.4 19.1 Z M 16.4 4.6 H 18.6 V 19.4 H 16.4 Z M 18.6 11.1 H 22.7 V 12.9 H 18.6 Z";

// Microelectronics - a packaged integrated circuit with its pins and die (MDI memory).
const IC_CHIP =
  "M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z";

// Electro-Optics - a ray diagram: collimated light entering a convex lens and
// converging on a focal point. Authored because MDI's optical glyphs are all lamps and
// pointers, which read as "lighting" rather than as the optics half of electro-optics.
// Two rays per side rather than three, and a ~0.65-unit air gap on each face of the
// lens (its cubics reach x 5.68-10.33, the rays stop at 5 and start at 11), so at 16px
// the lens stays a separate element instead of fusing with the beams into an arrowhead.
const ELECTRO_OPTICS =
  "M 8 2.8 C 11.1 8.32 11.1 15.68 8 21.2 C 4.9 15.68 4.9 8.32 8 2.8 Z M 0.4 6.4 H 5 V 8.7 H 0.4 Z M 0.4 15.3 H 5 V 17.6 H 0.4 Z M 11 6.4 L 20.2 10.8 L 20.2 12.6 L 11 8.7 Z M 11 17.6 L 20.2 13.2 L 20.2 11.4 L 11 15.3 Z M 19.2 12 A 2 2 0 1 1 23.2 12 A 2 2 0 1 1 19.2 12 Z";

// Signal Processing - a sampled waveform's envelope (MDI waveform).
const WAVEFORM =
  "M22 12L20 13L19 14L18 13L17 16L16 13L15 21L14 13L13 15L12 13L11 17L10 13L9 22L8 13L7 19L6 13L5 14L4 13L2 12L4 11L5 10L6 11L7 5L8 11L9 2L10 11L11 7L12 11L13 9L14 11L15 3L16 11L17 8L18 11L19 10L20 11L22 12Z";

// Control - the closed feedback loop, the defining structure of a control system
// (MDI autorenew). A literal block diagram needs strokes too fine to survive 16px.
const FEEDBACK_LOOP =
  "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z";

// Communication Systems - a transmitting antenna (MDI antenna).
const ANTENNA =
  "M12 7.5C12.69 7.5 13.27 7.73 13.76 8.2S14.5 9.27 14.5 10C14.5 11.05 14 11.81 13 12.28V21H11V12.28C10 11.81 9.5 11.05 9.5 10C9.5 9.27 9.76 8.67 10.24 8.2S11.31 7.5 12 7.5M16.69 5.3C17.94 6.55 18.61 8.11 18.7 10C18.7 11.8 18.03 13.38 16.69 14.72L15.5 13.5C16.5 12.59 17 11.42 17 10C17 8.67 16.5 7.5 15.5 6.5L16.69 5.3M6.09 4.08C4.5 5.67 3.7 7.64 3.7 10S4.5 14.3 6.09 15.89L4.92 17.11C3 15.08 2 12.7 2 10C2 7.3 3 4.94 4.92 2.91L6.09 4.08M19.08 2.91C21 4.94 22 7.3 22 10C22 12.8 21 15.17 19.08 17.11L17.91 15.89C19.5 14.3 20.3 12.33 20.3 10S19.5 5.67 17.91 4.08L19.08 2.91M7.31 5.3L8.5 6.5C7.5 7.42 7 8.58 7 10C7 11.33 7.5 12.5 8.5 13.5L7.31 14.72C5.97 13.38 5.3 11.8 5.3 10C5.3 8.2 5.97 6.64 7.31 5.3Z";

// ── Soft skills (Material Design Icons, Apache-2.0) ───────────────────────────

// Problem-Solving - a puzzle piece being fitted (MDI puzzle).
const PUZZLE =
  "M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4A2,2 0 0,0 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20A2,2 0 0,0 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17A2,2 0 0,0 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z";

// Teamwork - a group (MDI account-group).
const ACCOUNT_GROUP =
  "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z";

// Self-Learning - an open book (MDI book-open-page-variant). Deliberately not a
// graduation cap: the skill is self-directed study, not a conferred qualification.
const BOOK_OPEN =
  "M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z";

// Responsibility - a shield with a check (MDI shield-check): something entrusted and
// discharged.
const SHIELD_CHECK =
  "M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z";

// Initiative - a launch (MDI rocket-launch): starting something under one's own power.
const ROCKET_LAUNCH =
  "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z";

// ── View boxes ────────────────────────────────────────────────────────────────

/** The 24-unit box Simple Icons, MDI and the authored marks are all drawn in. */
const BOX_24 = "0 0 24 24";

/**
 * LabVIEW's run-arrow glyph, cropped from its lockup. The glyph's bounds inside the
 * source's 24-unit box are (8.41, 4.47)-(17.10, 13.16); this is that box padded 0.25
 * on each side and squared off, so the glyph fills the pill like every other mark.
 */
const BOX_LABVIEW = "8.16 4.22 9.19 9.19";

/**
 * MATLAB's membrane, cropped from devicon's 128-unit box. The mark's bounds are
 * (8, 13.2)-(120, 114.8), centred on (64, 64), so a 112-unit square centred there
 * crops the empty margin without distorting the aspect ratio.
 */
const BOX_MATLAB = "8 8 112 112";

// ── Registry ──────────────────────────────────────────────────────────────────

/** A resolved skill mark: the paths to paint, plus the box they were drawn in. */
export interface SkillIcon {
  /** One or more `d` attributes, all painted in the same colour by `SkillBadge`. */
  paths: readonly string[];
  /** The `viewBox` the path coordinates belong to. */
  viewBox: string;
}

/**
 * How a mark may be declared: a bare string for a single path in the 24-unit box, or
 * the object form for marks that need several paths and/or a different `viewBox`.
 */
type SkillIconDef = string | { d: string | readonly string[]; viewBox: string };

/**
 * Skill name → mark, keyed exactly as in `data/skills.ts`. A skill missing from here
 * falls back to its initial in `SkillBadge`, so an unmapped skill degrades gracefully
 * instead of breaking the pill.
 */
export const SKILL_ICONS: Record<string, SkillIconDef> = {
  // Programming & Tools - official brand marks.
  Python: PYTHON,
  C: C,
  Matlab: { d: MATLAB, viewBox: BOX_MATLAB },
  LabVIEW: { d: LABVIEW, viewBox: BOX_LABVIEW },
  LTspice: LTSPICE,

  // Lab & Instrumentation - authored; no vendor owns an instrument category.
  Oscilloscope: OSCILLOSCOPE,
  "Signal Generators": SIGNAL_GENERATOR,

  // Engineering Knowledge - concept marks; these are fields of study, not products.
  Circuits: RESISTOR_NODES,
  Semiconductors: DIODE,
  Microelectronics: IC_CHIP,
  "Electro-Optics": ELECTRO_OPTICS,
  "Signal Processing": WAVEFORM,
  Control: FEEDBACK_LOOP,
  "Communication Systems": ANTENNA,

  // Soft Skills - concept marks.
  "Problem-Solving": PUZZLE,
  Teamwork: ACCOUNT_GROUP,
  "Self-Learning": BOOK_OPEN,
  Responsibility: SHIELD_CHECK,
  Initiative: ROCKET_LAUNCH,
};

export function getSkillIcon(skillName: string): SkillIcon | null {
  const icon = SKILL_ICONS[skillName];
  if (!icon) return null;
  if (typeof icon === "string") return { paths: [icon], viewBox: BOX_24 };
  return {
    paths: typeof icon.d === "string" ? [icon.d] : icon.d,
    viewBox: icon.viewBox,
  };
}

/** Site accent (`--accent`) - the colour every non-branded mark is painted in. */
const ACCENT = "#B4400A";

/**
 * Skill name → brand colour for the mark, keyed exactly as in `data/skills.ts`.
 *
 * Official brand hexes, darkened only where the original is too light to read on the
 * warm cream pill surface (`--chip-fill` over `--bg-base`, ≈ #FAEBDE). Contrast on
 * that surface, for reference: Python 4.15:1, C 5.64:1, MATLAB 4.26:1, LabVIEW 3.60:1,
 * LTspice 8.12:1, accent 4.89:1 - so every mark clears the 3:1 non-text guideline
 * (the marks are `aria-hidden`; the skill name is always rendered as text beside them).
 *
 * Only the five products appear here. Concept marks are not branded, so they fall
 * through to `ACCENT` - their silhouettes already differ, so tinting them apart would
 * add colour noise for no gain.
 */
export const SKILL_COLORS: Record<string, string> = {
  // Official, used as published.
  Python: "#3776AB",
  LTspice: "#900028",

  // Darkened a step from the official hex, which fails on the cream surface:
  // C's #A8B9CC (1.72:1) and LabVIEW's #FFDB00 (1.17:1). Hue and saturation are
  // preserved; only lightness moves.
  C: "#485F7A",
  LabVIEW: "#8F7B00",

  // MathWorks publishes no monochrome hex, so this is the red stop from the official
  // membrane's own gradient in devicon's rendering of the mark.
  Matlab: "#CF3633",
};

export function getSkillColor(skillName: string): string {
  return SKILL_COLORS[skillName] ?? ACCENT;
}
