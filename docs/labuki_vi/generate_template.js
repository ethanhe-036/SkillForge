const pptxgen = require("pptxgenjs");
const path = require("path");

// ═══════════════════════════════════════════════════
// Labuki / 了不起科技 品牌 PPT 模板
// Based on VI Manual v1.0
// ═══════════════════════════════════════════════════

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "了不起科技 Labuki";
pres.title = "了不起科技 品牌PPT模板";
pres.subject = "品牌标准演示模板 v1.0";

// ── Brand Design Tokens ──────────────────────────
const C = {
  brand:  "4BB1FF",  // 了不起蓝 (primary)
  white:  "FFFFFF",
  black:  "020617",  // 了不起黑
  dark:   "0F172A",
  deep:   "034498",  // 深海蓝
  ice:    "DAEEFF",  // 冰川蓝
  light:  "EEF8FF",  // 最浅蓝
  cyan:   "9FF4FF",  // 荧光蓝
  mid:    "1950B4",
  // Gray scale (from VI manual)
  g50:  "F8FAFC",
  g100: "F1F5F9",
  g200: "E2E8F0",
  g300: "CBD5E1",
  g400: "94A3B8",
  g500: "64748B",
  g600: "475569",
  g700: "334155",
  g800: "1E293B",
};

const F = "Microsoft YaHei";

// Logo paths
const LOGO_DIR = __dirname;
const LOGO = {
  colorH: path.join(LOGO_DIR, "1、原色logo", "了不起科技logo_组合横-原色-800-400px.png"),
  colorV: path.join(LOGO_DIR, "1、原色logo", "了不起科技logo_组合竖-原色-500-500px.png"),
  whiteH: path.join(LOGO_DIR, "2、白色logo", "了不起科技logo_组合横-反白-800-400px .png"),
  enColor: path.join(LOGO_DIR, "1、原色logo", "了不起科技logo_英文-原色-500-500.png"),
  enWhite: path.join(LOGO_DIR, "2、白色logo", "了不起科技logo_英文-反白-500-500 .png"),
};

// Helper: fresh shadow object each time (pptxgenjs mutates options)
const cardShadow = () => ({
  type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.08
});

// ── Shared Components ────────────────────────────

function addFooter(slide, dark = false) {
  const lineColor = dark ? C.g700 : C.g200;
  const textColor = dark ? C.g600 : C.g400;
  const logoPath  = dark ? LOGO.whiteH : LOGO.colorH;

  slide.addShape(pres.shapes.LINE, {
    x: 0.6, y: 5.1, w: 8.8, h: 0,
    line: { color: lineColor, width: 0.5 }
  });
  slide.addImage({
    path: logoPath,
    x: 0.5, y: 5.15, w: 1.2, h: 0.42,
    sizing: { type: "contain", w: 1.2, h: 0.42 }
  });
  slide.addText("CONFIDENTIAL", {
    x: 7.0, y: 5.15, w: 2.4, h: 0.42,
    fontSize: 7, fontFace: F, color: textColor,
    align: "right", valign: "middle", margin: 0,
    charSpacing: 2
  });
}

function addPageTitle(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.5, w: 0.06, h: 0.5,
    fill: { color: C.brand }
  });
  slide.addText(title, {
    x: 0.85, y: 0.45, w: 8.5, h: 0.6,
    fontSize: 22, fontFace: F, color: C.black,
    bold: true, margin: 0, valign: "middle"
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.85, y: 1.0, w: 8.5, h: 0.35,
      fontSize: 11, fontFace: F, color: C.g600,
      margin: 0
    });
  }
}

// Small decorative dots (brand motif)
function addDots(slide, x, y, color, opacities) {
  opacities.forEach((op, i) => {
    slide.addShape(pres.shapes.OVAL, {
      x: x + i * 0.22, y, w: 0.1, h: 0.1,
      fill: { color, transparency: op }
    });
  });
}


// ═══════════════════════════════════════════════════
// SLIDE 1 — 封面页 (Cover)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.black };

  // ── Decorative geometry (right side) ──
  // Large deep blue rectangle (angled)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: -2.5, w: 9, h: 7,
    fill: { color: C.deep, transparency: 65 },
    rotate: -12
  });
  // Overlapping brand blue rectangle
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.2, y: -1.5, w: 8, h: 6,
    fill: { color: C.brand, transparency: 78 },
    rotate: -12
  });
  // Small cyan accent circle
  s.addShape(pres.shapes.OVAL, {
    x: 8.6, y: 0.6, w: 0.5, h: 0.5,
    fill: { color: C.cyan, transparency: 60 }
  });

  // ── Content ──
  s.addText("在此输入\n演示标题", {
    x: 0.8, y: 1.0, w: 5.5, h: 2.2,
    fontSize: 42, fontFace: F, color: C.white,
    bold: true, margin: 0, lineSpacingMultiple: 1.15
  });
  s.addText("在此输入副标题或简要描述", {
    x: 0.8, y: 3.2, w: 5, h: 0.5,
    fontSize: 14, fontFace: F, color: C.g400, margin: 0
  });

  addDots(s, 0.8, 3.85, C.brand, [0, 35, 65]);

  // Logo (prominent on cover)
  s.addImage({
    path: LOGO.whiteH,
    x: 0.8, y: 3.95, w: 2.4, h: 0.95,
    sizing: { type: "contain", w: 2.4, h: 0.95 }
  });

  s.addText("演讲者姓名  |  部门  |  2026年", {
    x: 0.8, y: 4.85, w: 5, h: 0.4,
    fontSize: 11, fontFace: F, color: C.g400, margin: 0
  });
})();


// ═══════════════════════════════════════════════════
// SLIDE 2 — 目录页 (Agenda / Contents)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  // Left brand blue panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.2, h: 5.625,
    fill: { color: C.brand }
  });
  // Subtle overlay pattern
  s.addShape(pres.shapes.OVAL, {
    x: -0.8, y: 3.5, w: 3, h: 3,
    fill: { color: C.white, transparency: 90 }
  });

  // Title (aligned with right-side first item)
  s.addText("目 录", {
    x: 0.6, y: 0.8, w: 2.2, h: 0.8,
    fontSize: 30, fontFace: F, color: C.white,
    bold: true, margin: 0
  });
  s.addText("CONTENTS", {
    x: 0.6, y: 1.5, w: 2.2, h: 0.35,
    fontSize: 10, fontFace: F, color: C.white,
    charSpacing: 4, margin: 0, transparency: 30
  });
  // Logo on blue panel
  s.addImage({
    path: LOGO.whiteH,
    x: 0.6, y: 4.4, w: 1.6, h: 0.7,
    sizing: { type: "contain", w: 1.6, h: 0.7 }
  });

  // Agenda items
  const items = [
    { num: "01", title: "第一章节标题", desc: "章节简要说明文字" },
    { num: "02", title: "第二章节标题", desc: "章节简要说明文字" },
    { num: "03", title: "第三章节标题", desc: "章节简要说明文字" },
    { num: "04", title: "第四章节标题", desc: "章节简要说明文字" },
  ];

  items.forEach((item, i) => {
    const yBase = 0.8 + i * 1.1;
    s.addText(item.num, {
      x: 3.8, y: yBase, w: 0.65, h: 0.7,
      fontSize: 28, fontFace: F, color: C.brand,
      bold: true, margin: 0, valign: "top"
    });
    s.addText(item.title, {
      x: 4.55, y: yBase + 0.02, w: 4.8, h: 0.4,
      fontSize: 16, fontFace: F, color: C.black,
      bold: true, margin: 0
    });
    s.addText(item.desc, {
      x: 4.55, y: yBase + 0.4, w: 4.8, h: 0.3,
      fontSize: 10, fontFace: F, color: C.g500, margin: 0
    });
    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 4.55, y: yBase + 0.9, w: 4.8, h: 0,
        line: { color: C.g200, width: 0.5 }
      });
    }
  });
})();


// ═══════════════════════════════════════════════════
// SLIDE 3 — 章节分隔页 (Section Divider)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.brand };

  // Large watermark number (fully within slide bounds)
  s.addText("01", {
    x: 4.5, y: -0.2, w: 5.2, h: 5.2,
    fontSize: 170, fontFace: F, color: C.white,
    bold: true, align: "right", valign: "middle",
    margin: 0, transparency: 85
  });

  // Decorative circles
  s.addShape(pres.shapes.OVAL, {
    x: 8.0, y: 0.3, w: 2.5, h: 2.5,
    fill: { color: C.white, transparency: 92 }
  });

  // Dots
  addDots(s, 0.8, 1.9, C.white, [0, 30, 60]);

  // Labels
  s.addText("PART 01", {
    x: 0.8, y: 2.15, w: 3, h: 0.35,
    fontSize: 11, fontFace: F, color: C.white,
    charSpacing: 5, margin: 0, transparency: 25
  });
  s.addText("章节标题", {
    x: 0.8, y: 2.6, w: 6, h: 1.0,
    fontSize: 38, fontFace: F, color: C.white,
    bold: true, margin: 0
  });
  s.addText("在此输入章节的简要描述或引导语", {
    x: 0.8, y: 3.6, w: 5, h: 0.45,
    fontSize: 13, fontFace: F, color: C.white,
    margin: 0, transparency: 15
  });
})();


// ═══════════════════════════════════════════════════
// SLIDE 4 — 纯文字内容页 (Text Content)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addPageTitle(s, "内容页标题", "在此输入副标题或简要说明");

  s.addText([
    { text: "正文内容标题", options: { fontSize: 16, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "在此输入正文内容。了不起科技致力于以创新技术简化企业跨境连接，帮助企业在全球化浪潮中把握机遇、实现增长。我们通过 AI 驱动的 SaaS 平台，为出海企业提供一站式运营支持。", options: { fontSize: 13, color: C.g600, lineSpacingMultiple: 1.7, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "要点一：在此输入关键信息和说明", options: { bullet: true, fontSize: 13, color: C.g600, breakLine: true } },
    { text: "要点二：在此输入关键信息和说明", options: { bullet: true, fontSize: 13, color: C.g600, breakLine: true } },
    { text: "要点三：在此输入关键信息和说明", options: { bullet: true, fontSize: 13, color: C.g600 } },
  ], {
    x: 0.85, y: 1.5, w: 8.55, h: 3.4,
    valign: "top", margin: 0, paraSpaceAfter: 6
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 5 — 图文并排 (Image + Text)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addPageTitle(s, "图文内容页标题");

  // Left text
  s.addText([
    { text: "核心观点标题", options: { fontSize: 16, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "在此输入详细描述内容。简明扼要地阐述核心观点，用数据和事实支撑论述。每个段落保持简洁有力。", options: { fontSize: 12, color: C.g600, lineSpacingMultiple: 1.6, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "关键信息点一", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "关键信息点二", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "关键信息点三", options: { bullet: true, fontSize: 12, color: C.g600 } },
  ], {
    x: 0.85, y: 1.5, w: 4.0, h: 3.3,
    valign: "top", margin: 0, paraSpaceAfter: 4
  });

  // Right image placeholder
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.4, y: 1.2, w: 4.0, h: 3.7,
    fill: { color: C.g100 },
    rectRadius: 0.12
  });
  s.addShape(pres.shapes.OVAL, {
    x: 6.85, y: 2.5, w: 1.1, h: 1.1,
    fill: { color: C.g200 }
  });
  s.addText("插入图片", {
    x: 5.4, y: 3.6, w: 4.0, h: 0.5,
    fontSize: 12, fontFace: F, color: C.g400,
    align: "center", valign: "middle", margin: 0
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 6 — 双栏布局 (Two Columns)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addPageTitle(s, "双栏对比布局");

  // ── Left column ──
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.5, w: 4.15, h: 2.8,
    fill: { color: C.g50 },
    shadow: cardShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.5, w: 4.15, h: 0.05,
    fill: { color: C.brand }
  });
  s.addText([
    { text: "左栏标题", options: { fontSize: 16, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "在此输入左栏的详细内容描述，可以包含多行文字和要点列表。支持灵活排版。", options: { fontSize: 12, color: C.g600, lineSpacingMultiple: 1.5, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "重点信息一", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "重点信息二", options: { bullet: true, fontSize: 12, color: C.g600 } },
  ], {
    x: 0.9, y: 1.75, w: 3.55, h: 2.3,
    valign: "top", margin: 0, paraSpaceAfter: 4
  });

  // ── Right column ──
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.5, w: 4.15, h: 2.8,
    fill: { color: C.g50 },
    shadow: cardShadow()
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.5, w: 4.15, h: 0.05,
    fill: { color: C.deep }
  });
  s.addText([
    { text: "右栏标题", options: { fontSize: 16, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "在此输入右栏的详细内容描述，可以包含多行文字和要点列表。支持灵活排版。", options: { fontSize: 12, color: C.g600, lineSpacingMultiple: 1.5, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "重点信息一", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "重点信息二", options: { bullet: true, fontSize: 12, color: C.g600 } },
  ], {
    x: 5.55, y: 1.75, w: 3.55, h: 2.3,
    valign: "top", margin: 0, paraSpaceAfter: 4
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 7 — 三栏卡片 (Three Feature Cards)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.g50 };

  addPageTitle(s, "核心优势", "三大核心能力一览");

  const cards = [
    { num: "01", title: "功能特色一", desc: "在此描述第一个核心功能或竞争优势，保持简洁有力" },
    { num: "02", title: "功能特色二", desc: "在此描述第二个核心功能或竞争优势，保持简洁有力" },
    { num: "03", title: "功能特色三", desc: "在此描述第三个核心功能或竞争优势，保持简洁有力" },
  ];

  cards.forEach((card, i) => {
    const x = 0.6 + i * 3.1;
    const cardY = 1.5;

    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: 2.8, h: 3.2,
      fill: { color: C.white },
      shadow: cardShadow()
    });
    // Top accent
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: 2.8, h: 0.05,
      fill: { color: C.brand }
    });
    // Icon circle (more visible)
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.85, y: cardY + 0.35, w: 1.1, h: 1.1,
      fill: { color: C.ice }
    });
    // Number label
    s.addText(card.num, {
      x: x + 0.85, y: cardY + 0.35, w: 1.1, h: 1.1,
      fontSize: 26, fontFace: F, color: C.brand,
      bold: true, align: "center", valign: "middle", margin: 0
    });
    // Title
    s.addText(card.title, {
      x: x + 0.2, y: cardY + 1.65, w: 2.4, h: 0.45,
      fontSize: 15, fontFace: F, color: C.black,
      bold: true, align: "center", margin: 0
    });
    // Description
    s.addText(card.desc, {
      x: x + 0.2, y: cardY + 2.1, w: 2.4, h: 0.85,
      fontSize: 11, fontFace: F, color: C.g500,
      align: "center", valign: "top", margin: 0,
      lineSpacingMultiple: 1.5
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 8 — 数据展示 (Key Stats)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addPageTitle(s, "关键数据", "用数字说话");

  // Subtle background circle decoration
  s.addShape(pres.shapes.OVAL, {
    x: 7.8, y: 3.2, w: 3.5, h: 3.5,
    fill: { color: C.light, transparency: 75 }
  });

  const stats = [
    { value: "98%",  label: "客户满意度", desc: "基于全球客户调研数据" },
    { value: "50+",  label: "服务国家",   desc: "覆盖全球主要市场" },
    { value: "10x",  label: "效率提升",   desc: "AI驱动的运营优化" },
  ];

  stats.forEach((stat, i) => {
    const x = 0.6 + i * 3.1;
    // Large number
    s.addText(stat.value, {
      x, y: 1.5, w: 2.8, h: 1.3,
      fontSize: 56, fontFace: F, color: C.brand,
      bold: true, align: "center", valign: "middle", margin: 0
    });
    // Label
    s.addText(stat.label, {
      x, y: 2.85, w: 2.8, h: 0.45,
      fontSize: 16, fontFace: F, color: C.black,
      bold: true, align: "center", margin: 0
    });
    // Thin accent line
    s.addShape(pres.shapes.LINE, {
      x: x + 0.9, y: 3.4, w: 1.0, h: 0,
      line: { color: C.brand, width: 1.5 }
    });
    // Description
    s.addText(stat.desc, {
      x, y: 3.55, w: 2.8, h: 0.4,
      fontSize: 11, fontFace: F, color: C.g600,
      align: "center", margin: 0
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 9 — 时间线/流程 (Timeline / Process)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };

  addPageTitle(s, "实施流程", "四步完成项目部署");

  const steps = [
    { num: "01", title: "需求分析", desc: "深入了解业务\n需求与痛点" },
    { num: "02", title: "方案设计", desc: "定制化解决\n方案输出" },
    { num: "03", title: "开发部署", desc: "敏捷开发与\n系统集成" },
    { num: "04", title: "持续优化", desc: "数据驱动的\n迭代优化" },
  ];

  // Horizontal connector line (moved up for better spacing)
  const lineY = 2.3;
  s.addShape(pres.shapes.LINE, {
    x: 1.5, y: lineY, w: 7.0, h: 0,
    line: { color: C.g300, width: 2.5 }
  });

  steps.forEach((step, i) => {
    const cx = 1.5 + i * (7.0 / 3);  // center of each node
    // Circle node
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.28, y: lineY - 0.28, w: 0.56, h: 0.56,
      fill: { color: C.brand }
    });
    // Number
    s.addText(step.num, {
      x: cx - 0.28, y: lineY - 0.28, w: 0.56, h: 0.56,
      fontSize: 11, fontFace: F, color: C.white,
      bold: true, align: "center", valign: "middle", margin: 0
    });
    // Title
    s.addText(step.title, {
      x: cx - 0.8, y: 2.85, w: 1.6, h: 0.4,
      fontSize: 14, fontFace: F, color: C.black,
      bold: true, align: "center", margin: 0
    });
    // Description
    s.addText(step.desc, {
      x: cx - 0.8, y: 3.25, w: 1.6, h: 0.8,
      fontSize: 11, fontFace: F, color: C.g600,
      align: "center", margin: 0, lineSpacingMultiple: 1.4
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 10 — 结束页 (Thank You)
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.black };

  // Decorative shapes
  s.addShape(pres.shapes.OVAL, {
    x: -1.5, y: -1.5, w: 5, h: 5,
    fill: { color: C.deep, transparency: 75 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 3, w: 4.5, h: 4.5,
    fill: { color: C.brand, transparency: 85 }
  });

  // Thank you
  s.addText("谢谢", {
    x: 0, y: 1.1, w: 10, h: 1.2,
    fontSize: 48, fontFace: F, color: C.white,
    bold: true, align: "center", margin: 0
  });
  s.addText("THANK YOU", {
    x: 0, y: 2.2, w: 10, h: 0.5,
    fontSize: 13, fontFace: F, color: C.g500,
    align: "center", charSpacing: 6, margin: 0
  });

  addDots(s, 4.78, 2.85, C.brand, [0, 30, 60]);

  // Contact info
  s.addText([
    { text: "联系我们", options: { fontSize: 12, bold: true, color: C.brand, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "contact@labuki.com  |  www.labuki.com", options: { fontSize: 11, color: C.g400 } },
  ], {
    x: 0, y: 3.1, w: 10, h: 0.9,
    align: "center", margin: 0
  });

  // Logo (larger for closing slide)
  s.addImage({
    path: LOGO.whiteH,
    x: 3.5, y: 4.1, w: 3.0, h: 1.1,
    sizing: { type: "contain", w: 3.0, h: 1.1 }
  });
})();


// ═══════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════
const outputPath = path.join(LOGO_DIR, "Labuki-PPT-Template.pptx");
pres.writeFile({ fileName: outputPath })
  .then(() => console.log("SUCCESS: " + outputPath))
  .catch(err => console.error("ERROR:", err));
