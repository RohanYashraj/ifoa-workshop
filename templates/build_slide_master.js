// 00_slide_master.pptx — IFoA Workshop "AI for Actuaries: From Foundations to AI Agents"
// Eight layouts only. Placeholder text only. No workshop content.

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

// 16:9 = 10" x 5.625"
pres.layout = "LAYOUT_16x9";
pres.author = "Dr Rohan Yashraj Gupta (FIA, FIAI)";
pres.title = "AI for Actuaries — Slide Master";
pres.subject = "IFoA Workshop · Hilton near Airport, Mumbai · 15 May 2026";
pres.company = "Institute and Faculty of Actuaries";

// =============================================================================
// PALETTE (matched to 00_style_guide.md)
// =============================================================================
const NAVY     = "0F1E3D"; // primary
const GOLD     = "B89759"; // accent
const CREAM    = "F5EFE0"; // optional warm panel
const INK      = "1A1A1A"; // body text on white
const SLATE    = "5C6470"; // captions, footnotes
const WHITE    = "FFFFFF";
const ALERT    = "B23A3A";
const AMBER    = "C58B3F";

// Derived neutrals for code zones / soft panels
const SOFT_GREY  = "F4F5F7";
const PALE_NAVY  = "E6EAF2";
const NAVY_TINT  = "1A2D54";

// =============================================================================
// FONTS — Inter primary, Calibri auto-fallback in PowerPoint
// =============================================================================
const HEADING = "Inter";
const BODY    = "Inter";
const CODE    = "JetBrains Mono";

// =============================================================================
// HELPERS — fresh option objects every call (pptxgenjs mutates inputs)
// =============================================================================

// IFoA crest placeholder — small navy-bordered chip top-left of content slides
function placeIfoaCrest(slide, x = 0.32, y = 0.18) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 1.0, h: 0.42,
    fill: { color: WHITE },
    line: { color: NAVY, width: 1 },
  });
  slide.addText("IFoA", {
    x: x, y: y, w: 1.0, h: 0.42,
    fontFace: HEADING, fontSize: 11, bold: true, color: NAVY,
    align: "center", valign: "middle", margin: 0,
  });
}

// Workshop tag placeholder — top-right of content slides
function placeWorkshopTag(slide, sessionLabel = "Session N") {
  slide.addText(
    [
      { text: "AI for Actuaries", options: { bold: true, color: NAVY } },
      { text: "  ·  ", options: { color: SLATE } },
      { text: sessionLabel, options: { color: SLATE } },
    ],
    {
      x: 6.0, y: 0.22, w: 3.7, h: 0.34,
      fontFace: HEADING, fontSize: 11,
      align: "right", valign: "middle", margin: 0,
    }
  );
}

// Navy title bar — used on content / diagram / code / compare layouts
function placeTitleBar(slide, titleText = "Slide title here") {
  // Thin navy underline rule below title row (not a full bar — softer than a coloured stripe)
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 1.05, w: 9.0, h: 0,
    line: { color: NAVY, width: 1.25 },
  });
  slide.addText(titleText, {
    x: 0.5, y: 0.62, w: 9.0, h: 0.42,
    fontFace: HEADING, fontSize: 24, bold: true, color: NAVY,
    align: "left", valign: "middle", margin: 0,
  });
}

// Footer strip — page label + small citation/disclaimer slot
function placeFooter(slide, leftText = "Citation / source goes here", rightText = "") {
  slide.addText(leftText, {
    x: 0.5, y: 5.30, w: 7.0, h: 0.25,
    fontFace: BODY, fontSize: 10, italic: true, color: SLATE,
    align: "left", valign: "middle", margin: 0,
  });
  slide.addText(rightText, {
    x: 7.5, y: 5.30, w: 2.0, h: 0.25,
    fontFace: BODY, fontSize: 10, color: SLATE,
    align: "right", valign: "middle", margin: 0,
  });
}

// Standard speaker note skeleton
function addStandardNotes(slide, layoutName) {
  slide.addNotes(
    `[${layoutName} layout — placeholder]\n\n` +
    `Hook — one sentence opening the slide for the audience.\n\n` +
    `Content — three to five sentences in Rohan's first-person voice. ` +
    `Reference the visual or code on the slide. Name a specific actuary, ` +
    `regulator, or LOB context where possible.\n\n` +
    `Punchline — one sentence, the line they should remember.\n\n` +
    `Transition — one sentence pointing to the next slide.\n\n` +
    `Target length: 80–150 words. See 00_speaker_note_template.md.`
  );
}

// =============================================================================
// LAYOUT 1 — COVER
// Full-bleed navy, gold horizontal accent, title centred, IFoA crest top-right,
// instructor names along bottom.
// =============================================================================
pres.defineSlideMaster({
  title: "COVER",
  background: { color: NAVY },
  objects: [
    // Gold horizontal accent line (above the title block)
    { rect: { x: 3.5, y: 1.95, w: 3.0, h: 0.045, fill: { color: GOLD }, line: { color: GOLD } } },
    // IFoA crest placeholder — top-right
    { rect: { x: 8.4, y: 0.32, w: 1.25, h: 0.50, fill: { color: WHITE }, line: { color: GOLD, width: 1 } } },
    { text: { text: "IFoA crest", options: {
        x: 8.4, y: 0.32, w: 1.25, h: 0.50,
        fontFace: HEADING, fontSize: 10, bold: true, color: NAVY,
        align: "center", valign: "middle", margin: 0,
    } } },
    // Bottom thin gold rule above instructor strip
    { rect: { x: 0.5, y: 5.05, w: 9.0, h: 0.02, fill: { color: GOLD }, line: { color: GOLD } } },
  ],
});

const slCover = pres.addSlide({ masterName: "COVER" });
// Workshop title (placeholder)
slCover.addText("Workshop Title", {
  x: 0.5, y: 2.20, w: 9.0, h: 0.85,
  fontFace: HEADING, fontSize: 44, bold: true, color: WHITE,
  align: "center", valign: "middle", margin: 0,
});
// Subtitle (placeholder)
slCover.addText("Workshop subtitle line", {
  x: 0.5, y: 3.10, w: 9.0, h: 0.45,
  fontFace: HEADING, fontSize: 22, color: GOLD,
  align: "center", valign: "middle", margin: 0,
});
// Date · Venue (placeholder)
slCover.addText("DD Month YYYY  ·  Venue, City", {
  x: 0.5, y: 3.65, w: 9.0, h: 0.35,
  fontFace: BODY, fontSize: 14, color: WHITE,
  align: "center", valign: "middle", margin: 0,
  charSpacing: 2,
});
// Instructor strip — three placeholders, brochure order: Satya, Rohan, Sai Krishna
slCover.addText(
  [
    { text: "Instructor One", options: { bold: true, color: WHITE } },
    { text: "   ·   ", options: { color: GOLD } },
    { text: "Instructor Two", options: { bold: true, color: WHITE } },
    { text: "   ·   ", options: { color: GOLD } },
    { text: "Instructor Three", options: { bold: true, color: WHITE } },
  ],
  {
    x: 0.5, y: 5.18, w: 9.0, h: 0.34,
    fontFace: HEADING, fontSize: 13,
    align: "center", valign: "middle", margin: 0,
  }
);
addStandardNotes(slCover, "COVER");

// =============================================================================
// LAYOUT 2 — SECTION DIVIDER
// Full-bleed navy. Gold accent line. Part number top-left, Part title centred.
// =============================================================================
pres.defineSlideMaster({
  title: "SECTION",
  background: { color: NAVY },
  objects: [
    // Gold accent line — short vertical mark left of centre, plus thin horizontal under title
    { rect: { x: 4.5, y: 3.20, w: 1.0, h: 0.04, fill: { color: GOLD }, line: { color: GOLD } } },
  ],
});

const slSection = pres.addSlide({ masterName: "SECTION" });
// Part number — top-left
slSection.addText("PART N", {
  x: 0.55, y: 0.45, w: 3.0, h: 0.4,
  fontFace: HEADING, fontSize: 13, bold: true, color: GOLD,
  align: "left", valign: "middle", margin: 0,
  charSpacing: 6,
});
// Part title — centred
slSection.addText("Part title here", {
  x: 0.5, y: 2.30, w: 9.0, h: 0.85,
  fontFace: HEADING, fontSize: 40, bold: true, color: WHITE,
  align: "center", valign: "middle", margin: 0,
});
// Optional one-line subtitle slot under the gold rule
slSection.addText("Optional one-line subtitle", {
  x: 0.5, y: 3.35, w: 9.0, h: 0.4,
  fontFace: BODY, fontSize: 16, italic: true, color: WHITE,
  align: "center", valign: "middle", margin: 0,
});
addStandardNotes(slSection, "SECTION DIVIDER");

// =============================================================================
// LAYOUT 3 — TITLE + BULLETS
// White background, navy title bar, 3–5 bullets, optional small visual zone right.
// =============================================================================
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: WHITE },
  objects: [],
});

const slContent = pres.addSlide({ masterName: "CONTENT" });
placeWorkshopTag(slContent, "Session N");
placeTitleBar(slContent, "Slide title here");

// Bullets zone (left)
slContent.addText(
  [
    { text: "Bullet one — short, single idea", options: { bullet: true, breakLine: true } },
    { text: "Bullet two — keep to one line where possible", options: { bullet: true, breakLine: true } },
    { text: "Bullet three", options: { bullet: true, breakLine: true } },
    { text: "Bullet four (optional)", options: { bullet: true, breakLine: true } },
    { text: "Bullet five (cap at five)", options: { bullet: true } },
  ],
  {
    x: 0.55, y: 1.30, w: 6.30, h: 3.85,
    fontFace: BODY, fontSize: 18, color: INK,
    paraSpaceAfter: 8,
    align: "left", valign: "top", margin: 0,
  }
);

// Optional small visual zone (right) — dashed placeholder box
slContent.addShape(pres.shapes.RECTANGLE, {
  x: 7.05, y: 1.30, w: 2.50, h: 3.10,
  fill: { color: SOFT_GREY },
  line: { color: SLATE, width: 0.75, dashType: "dash" },
});
slContent.addText("Optional visual\n(diagram / chart / icon)", {
  x: 7.05, y: 1.30, w: 2.50, h: 3.10,
  fontFace: BODY, fontSize: 11, color: SLATE, italic: true,
  align: "center", valign: "middle", margin: 0,
});

placeFooter(slContent, "Citation / source goes here", "S{n}.P{n}.x");
addStandardNotes(slContent, "TITLE + BULLETS");

// =============================================================================
// LAYOUT 4 — DIAGRAM-LED
// White background, narrow navy title bar, large diagram zone (~70%),
// single-line caption beneath.
// =============================================================================
pres.defineSlideMaster({
  title: "DIAGRAM",
  background: { color: WHITE },
  objects: [],
});

const slDiagram = pres.addSlide({ masterName: "DIAGRAM" });
placeWorkshopTag(slDiagram, "Session N");
placeTitleBar(slDiagram, "Slide title here");

// Large diagram zone — ~70% of slide area
slDiagram.addShape(pres.shapes.RECTANGLE, {
  x: 0.55, y: 1.25, w: 8.90, h: 3.45,
  fill: { color: SOFT_GREY },
  line: { color: SLATE, width: 0.75, dashType: "dash" },
});
slDiagram.addText("Diagram goes here\n(structural visual — agent flow, model decision surface, ReAct loop, …)", {
  x: 0.55, y: 1.25, w: 8.90, h: 3.45,
  fontFace: BODY, fontSize: 13, italic: true, color: SLATE,
  align: "center", valign: "middle", margin: 0,
});

// Single-line caption beneath
slDiagram.addText("One-line caption beneath the diagram — what the picture is saying", {
  x: 0.55, y: 4.78, w: 8.90, h: 0.34,
  fontFace: BODY, fontSize: 13, italic: true, color: INK,
  align: "center", valign: "middle", margin: 0,
});

placeFooter(slDiagram, "Citation / source goes here", "S{n}.P{n}.x");
addStandardNotes(slDiagram, "DIAGRAM-LED");

// =============================================================================
// LAYOUT 5 — CODE + OUTPUT
// White background, navy title bar, code zone (monospace) on left, output zone
// on right, Colab badge top-right of code zone.
// =============================================================================
pres.defineSlideMaster({
  title: "CODE",
  background: { color: WHITE },
  objects: [],
});

const slCode = pres.addSlide({ masterName: "CODE" });
placeWorkshopTag(slCode, "Session N");
placeTitleBar(slCode, "Slide title here");

// Sub-label: CODE
slCode.addText("CODE", {
  x: 0.55, y: 1.22, w: 1.5, h: 0.28,
  fontFace: HEADING, fontSize: 10, bold: true, color: SLATE,
  charSpacing: 6, align: "left", valign: "middle", margin: 0,
});

// Colab badge placeholder — top-right of code zone
slCode.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 4.45, y: 1.18, w: 1.30, h: 0.32,
  fill: { color: NAVY }, line: { color: NAVY }, rectRadius: 0.04,
});
slCode.addText("Open in Colab", {
  x: 4.45, y: 1.18, w: 1.30, h: 0.32,
  fontFace: HEADING, fontSize: 9, bold: true, color: GOLD,
  align: "center", valign: "middle", margin: 0,
});

// Code zone (left)
slCode.addShape(pres.shapes.RECTANGLE, {
  x: 0.55, y: 1.55, w: 5.20, h: 3.55,
  fill: { color: SOFT_GREY },
  line: { color: PALE_NAVY, width: 1 },
});
slCode.addText(
  [
    { text: "# 8–15 lines of Python", options: { color: SLATE, breakLine: true } },
    { text: "import pandas as pd", options: { color: INK, breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "motor = pd.read_csv(URL)", options: { color: INK, breakLine: true } },
    { text: "freq = (motor['claim_count']", options: { color: INK, breakLine: true } },
    { text: "        / motor['exposure_years'])", options: { color: INK, breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "print(freq.describe())", options: { color: INK } },
  ],
  {
    x: 0.75, y: 1.65, w: 4.85, h: 3.35,
    fontFace: CODE, fontSize: 13, color: INK,
    align: "left", valign: "top", margin: 0,
  }
);

// Sub-label: OUTPUT
slCode.addText("OUTPUT", {
  x: 5.95, y: 1.22, w: 1.5, h: 0.28,
  fontFace: HEADING, fontSize: 10, bold: true, color: SLATE,
  charSpacing: 6, align: "left", valign: "middle", margin: 0,
});

// Output zone (right)
slCode.addShape(pres.shapes.RECTANGLE, {
  x: 5.95, y: 1.55, w: 3.50, h: 3.55,
  fill: { color: WHITE },
  line: { color: PALE_NAVY, width: 1 },
});
slCode.addText(
  [
    { text: "count   5000.00", options: { breakLine: true } },
    { text: "mean       0.08", options: { breakLine: true } },
    { text: "std        0.27", options: { breakLine: true } },
    { text: "min        0.00", options: { breakLine: true } },
    { text: "max        4.00", options: { breakLine: true } },
    { text: "Name: freq, dtype: float64", options: { color: SLATE } },
  ],
  {
    x: 6.15, y: 1.65, w: 3.10, h: 3.35,
    fontFace: CODE, fontSize: 12, color: INK,
    align: "left", valign: "top", margin: 0,
  }
);

placeFooter(slCode, "Companion notebook: 0X_filename.ipynb", "S{n}.P{n}.x");
addStandardNotes(slCode, "CODE + OUTPUT");

// =============================================================================
// LAYOUT 6 — SIDE-BY-SIDE COMPARE
// White background, navy title bar, two equal columns with sub-titles.
// =============================================================================
pres.defineSlideMaster({
  title: "COMPARE",
  background: { color: WHITE },
  objects: [],
});

const slCompare = pres.addSlide({ masterName: "COMPARE" });
placeWorkshopTag(slCompare, "Session N");
placeTitleBar(slCompare, "Slide title here");

// Vertical divider
slCompare.addShape(pres.shapes.LINE, {
  x: 5.0, y: 1.30, w: 0, h: 3.55,
  line: { color: SLATE, width: 0.75, dashType: "solid" },
});

// LEFT column header
slCompare.addText("Left option", {
  x: 0.55, y: 1.30, w: 4.20, h: 0.45,
  fontFace: HEADING, fontSize: 18, bold: true, color: NAVY,
  align: "left", valign: "middle", margin: 0,
});
// LEFT column body
slCompare.addText(
  [
    { text: "Bullet one", options: { bullet: true, breakLine: true } },
    { text: "Bullet two", options: { bullet: true, breakLine: true } },
    { text: "Bullet three", options: { bullet: true } },
  ],
  {
    x: 0.55, y: 1.85, w: 4.20, h: 3.00,
    fontFace: BODY, fontSize: 16, color: INK,
    paraSpaceAfter: 8,
    align: "left", valign: "top", margin: 0,
  }
);

// RIGHT column header
slCompare.addText("Right option", {
  x: 5.25, y: 1.30, w: 4.20, h: 0.45,
  fontFace: HEADING, fontSize: 18, bold: true, color: NAVY,
  align: "left", valign: "middle", margin: 0,
});
// RIGHT column body
slCompare.addText(
  [
    { text: "Bullet one", options: { bullet: true, breakLine: true } },
    { text: "Bullet two", options: { bullet: true, breakLine: true } },
    { text: "Bullet three", options: { bullet: true } },
  ],
  {
    x: 5.25, y: 1.85, w: 4.20, h: 3.00,
    fontFace: BODY, fontSize: 16, color: INK,
    paraSpaceAfter: 8,
    align: "left", valign: "top", margin: 0,
  }
);

placeFooter(slCompare, "Citation / source goes here", "S{n}.P{n}.x");
addStandardNotes(slCompare, "SIDE-BY-SIDE COMPARE");

// =============================================================================
// LAYOUT 7 — READER TAKEAWAY
// Navy background. Gold "What you take away" title. Three bullet placeholders.
// =============================================================================
pres.defineSlideMaster({
  title: "TAKEAWAY",
  background: { color: NAVY },
  objects: [],
});

const slTakeaway = pres.addSlide({ masterName: "TAKEAWAY" });
// Eyebrow label
slTakeaway.addText("PART N · TAKEAWAY", {
  x: 0.55, y: 0.55, w: 9.0, h: 0.32,
  fontFace: HEADING, fontSize: 11, bold: true, color: GOLD,
  charSpacing: 6, align: "left", valign: "middle", margin: 0,
});
// Title (gold)
slTakeaway.addText("What you take away", {
  x: 0.55, y: 0.90, w: 9.0, h: 0.65,
  fontFace: HEADING, fontSize: 32, bold: true, color: GOLD,
  align: "left", valign: "middle", margin: 0,
});
// Three takeaway bullets — large, single-line each
slTakeaway.addText(
  [
    { text: "First takeaway — single line, the headline you want them leaving with", options: { bullet: true, breakLine: true } },
    { text: "Second takeaway — single line, complementary to the first", options: { bullet: true, breakLine: true } },
    { text: "Third takeaway — single line, the Monday-morning action", options: { bullet: true } },
  ],
  {
    x: 0.65, y: 2.05, w: 8.90, h: 2.80,
    fontFace: BODY, fontSize: 20, color: WHITE,
    paraSpaceAfter: 14,
    align: "left", valign: "top", margin: 0,
  }
);
addStandardNotes(slTakeaway, "READER TAKEAWAY");

// =============================================================================
// LAYOUT 8 — CLOSING / CREDITS
// White background. Three columns for instructors with role lines and headshot
// placeholders. Contact details strip at the bottom.
// =============================================================================
pres.defineSlideMaster({
  title: "CREDITS",
  background: { color: WHITE },
  objects: [
    // Bottom contact strip background — taller to fit single-line content
    { rect: { x: 0, y: 4.95, w: 10, h: 0.675, fill: { color: NAVY }, line: { color: NAVY } } },
    // Gold rule above contact strip
    { rect: { x: 0, y: 4.92, w: 10, h: 0.03, fill: { color: GOLD }, line: { color: GOLD } } },
  ],
});

const slCredits = pres.addSlide({ masterName: "CREDITS" });
placeWorkshopTag(slCredits, "Session N");

// Title
slCredits.addText("Your instructors today", {
  x: 0.5, y: 0.62, w: 9.0, h: 0.45,
  fontFace: HEADING, fontSize: 24, bold: true, color: NAVY,
  align: "left", valign: "middle", margin: 0,
});
slCredits.addShape(pres.shapes.LINE, {
  x: 0.5, y: 1.10, w: 9.0, h: 0,
  line: { color: NAVY, width: 1.25 },
});

// Three columns — name + designation only (no headshots)
const colW = 2.85;
const cols = [
  { x: 0.55, label: "Instructor One",   role: "Designation line one\nAffiliation line one" },
  { x: 3.575, label: "Instructor Two",   role: "Designation line two\nAffiliation line two" },
  { x: 6.60, label: "Instructor Three", role: "Designation line three\nAffiliation line three" },
];

cols.forEach((c) => {
  // Short gold accent above each name — visual anchor in absence of headshots
  slCredits.addShape(pres.shapes.RECTANGLE, {
    x: c.x + (colW - 0.6) / 2, y: 2.05, w: 0.6, h: 0.04,
    fill: { color: GOLD }, line: { color: GOLD },
  });
  // Name
  slCredits.addText(c.label, {
    x: c.x, y: 2.20, w: colW, h: 0.55,
    fontFace: HEADING, fontSize: 20, bold: true, color: NAVY,
    align: "center", valign: "middle", margin: 0,
  });
  // Designation / affiliation
  slCredits.addText(c.role, {
    x: c.x, y: 2.85, w: colW, h: 1.30,
    fontFace: BODY, fontSize: 14, color: INK,
    align: "center", valign: "top", margin: 0,
    paraSpaceAfter: 4,
  });
});

// Contact strip — workshop hub + case study deadline (no Slack)
slCredits.addText(
  [
    { text: "Hub: ",        options: { bold: true, color: GOLD } },
    { text: "github.com/rohanyashraj/ifoa-workshop", options: { color: WHITE } },
    { text: "       |       ", options: { color: GOLD } },
    { text: "Case study due: ", options: { bold: true, color: GOLD } },
    { text: "29 May 2026",  options: { color: WHITE } },
  ],
  {
    x: 0.4, y: 4.97, w: 9.2, h: 0.625,
    fontFace: BODY, fontSize: 12,
    align: "center", valign: "middle", margin: 0,
  }
);

addStandardNotes(slCredits, "CLOSING / CREDITS");

// =============================================================================
// WRITE
// =============================================================================
pres.writeFile({ fileName: "00_slide_master.pptx" })
  .then((fn) => console.log("Wrote:", fn))
  .catch((err) => { console.error(err); process.exit(1); });
