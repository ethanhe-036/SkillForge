const pptxgen = require("pptxgenjs");
const path = require("path");

// ═══════════════════════════════════════════════════
// Ethan 转正述职 PPT — 基于 Labuki VI Design Spec
// ═══════════════════════════════════════════════════

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Ethan";
pres.title = "转正述职报告 — Ethan";

// ── Brand Design Tokens ──
const C = {
  brand: "4BB1FF", white: "FFFFFF", black: "020617",
  deep: "034498", ice: "DAEEFF", light: "EEF8FF", cyan: "9FF4FF",
  g50: "F8FAFC", g100: "F1F5F9", g200: "E2E8F0", g300: "CBD5E1",
  g400: "94A3B8", g500: "64748B", g600: "475569", g700: "334155",
  g800: "1E293B",
};
const F = "Microsoft YaHei";

// Logo paths
const VI = path.resolve(__dirname, "..", "labuki_vi");
const LOGO = {
  colorH: path.join(VI, "1、原色logo", "了不起科技logo_组合横-原色-800-400px.png"),
  whiteH: path.join(VI, "2、白色logo", "了不起科技logo_组合横-反白-800-400px .png"),
};

// Transition for all slides
const TRANSITION = { type: "fade", speed: 0.8 };

// ── Helpers ──
const cardShadow = () => ({ type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.08 });

function addFooter(slide) {
  slide.addShape(pres.shapes.LINE, { x: 0.6, y: 5.1, w: 8.8, h: 0, line: { color: C.g200, width: 0.5 } });
  slide.addImage({ path: LOGO.colorH, x: 0.5, y: 5.15, w: 1.2, h: 0.42, sizing: { type: "contain", w: 1.2, h: 0.42 } });
  slide.addText("CONFIDENTIAL", { x: 7.0, y: 5.15, w: 2.4, h: 0.42, fontSize: 7, fontFace: F, color: C.g400, align: "right", valign: "middle", margin: 0, charSpacing: 2 });
}

function addPageTitle(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 0.5, w: 0.06, h: 0.5, fill: { color: C.brand } });
  slide.addText(title, { x: 0.85, y: 0.45, w: 8.5, h: 0.6, fontSize: 22, fontFace: F, color: C.black, bold: true, margin: 0, valign: "middle" });
  if (subtitle) {
    slide.addText(subtitle, { x: 0.85, y: 1.0, w: 8.5, h: 0.35, fontSize: 11, fontFace: F, color: C.g600, margin: 0 });
  }
}

function addDots(slide, x, y, color, opacities) {
  opacities.forEach((op, i) => {
    slide.addShape(pres.shapes.OVAL, { x: x + i * 0.22, y, w: 0.1, h: 0.1, fill: { color, transparency: op } });
  });
}

// Animation helper: onClick appear
function animAppear(delay) {
  return { type: "appear", delay: delay || 0 };
}

// ═══════════════════════════════════════════════════
// SLIDE 1 — 封面
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.black };
  s.transition = TRANSITION;

  // Decorative geometry
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: -2.5, w: 9, h: 7, fill: { color: C.deep, transparency: 65 }, rotate: -12 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: -1.5, w: 8, h: 6, fill: { color: C.brand, transparency: 78 }, rotate: -12 });
  s.addShape(pres.shapes.OVAL, { x: 8.6, y: 0.6, w: 0.5, h: 0.5, fill: { color: C.cyan, transparency: 60 } });

  s.addText("转正述职报告", {
    x: 0.8, y: 1.0, w: 5.5, h: 1.2,
    fontSize: 42, fontFace: F, color: C.white, bold: true, margin: 0
  });
  s.addText("技术研发部 · 后端开发工程师", {
    x: 0.8, y: 2.3, w: 5, h: 0.5,
    fontSize: 14, fontFace: F, color: C.g400, margin: 0
  });

  addDots(s, 0.8, 3.0, C.brand, [0, 35, 65]);

  s.addImage({ path: LOGO.whiteH, x: 0.8, y: 3.5, w: 2.4, h: 0.95, sizing: { type: "contain", w: 2.4, h: 0.95 } });

  s.addText("Ethan  |  2026年2月", {
    x: 0.8, y: 4.6, w: 5, h: 0.4,
    fontSize: 11, fontFace: F, color: C.g400, margin: 0
  });
})();


// ═══════════════════════════════════════════════════
// SLIDE 2 — 目录
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 3.2, h: 5.625, fill: { color: C.brand } });
  s.addShape(pres.shapes.OVAL, { x: -0.8, y: 3.5, w: 3, h: 3, fill: { color: C.white, transparency: 90 } });

  s.addText("目 录", { x: 0.6, y: 0.8, w: 2.2, h: 0.8, fontSize: 30, fontFace: F, color: C.white, bold: true, margin: 0 });
  s.addText("CONTENTS", { x: 0.6, y: 1.5, w: 2.2, h: 0.35, fontSize: 10, fontFace: F, color: C.white, charSpacing: 4, margin: 0, transparency: 30 });
  s.addImage({ path: LOGO.whiteH, x: 0.6, y: 4.4, w: 1.6, h: 0.7, sizing: { type: "contain", w: 1.6, h: 0.7 } });

  const items = [
    { num: "01", title: "个人介绍", desc: "基本信息与岗位职责" },
    { num: "02", title: "工作成果", desc: "核心项目与关键交付" },
    { num: "03", title: "成长与反思", desc: "收获总结与不足改进" },
    { num: "04", title: "未来规划", desc: "技术深耕与发展方向" },
  ];
  items.forEach((item, i) => {
    const yBase = 0.8 + i * 1.1;
    s.addText(item.num, { x: 3.8, y: yBase, w: 0.65, h: 0.7, fontSize: 28, fontFace: F, color: C.brand, bold: true, margin: 0, valign: "top" });
    s.addText(item.title, { x: 4.55, y: yBase + 0.02, w: 4.8, h: 0.4, fontSize: 16, fontFace: F, color: C.black, bold: true, margin: 0 });
    s.addText(item.desc, { x: 4.55, y: yBase + 0.4, w: 4.8, h: 0.3, fontSize: 10, fontFace: F, color: C.g500, margin: 0 });
    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, { x: 4.55, y: yBase + 0.9, w: 4.8, h: 0, line: { color: C.g200, width: 0.5 } });
    }
  });
})();


// ═══════════════════════════════════════════════════
// SLIDE 3 — 章节页: 个人介绍
// ═══════════════════════════════════════════════════
function addSectionSlide(num, title, desc) {
  const s = pres.addSlide();
  s.background = { color: C.brand };
  s.transition = TRANSITION;

  s.addText(num, { x: 4.5, y: -0.2, w: 5.2, h: 5.2, fontSize: 170, fontFace: F, color: C.white, bold: true, align: "right", valign: "middle", margin: 0, transparency: 85 });
  s.addShape(pres.shapes.OVAL, { x: 8.0, y: 0.3, w: 2.5, h: 2.5, fill: { color: C.white, transparency: 92 } });
  addDots(s, 0.8, 1.9, C.white, [0, 30, 60]);
  s.addText("PART " + num, { x: 0.8, y: 2.15, w: 3, h: 0.35, fontSize: 11, fontFace: F, color: C.white, charSpacing: 5, margin: 0, transparency: 25 });
  s.addText(title, { x: 0.8, y: 2.6, w: 6, h: 1.0, fontSize: 38, fontFace: F, color: C.white, bold: true, margin: 0 });
  if (desc) {
    s.addText(desc, { x: 0.8, y: 3.6, w: 5, h: 0.45, fontSize: 13, fontFace: F, color: C.white, margin: 0, transparency: 15 });
  }
  return s;
}

addSectionSlide("01", "个人介绍", "基本信息与岗位职责");


// ═══════════════════════════════════════════════════
// SLIDE 4 — 个人介绍内容
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "个人介绍");

  // Info card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.5, w: 4.0, h: 2.5, fill: { color: C.g50 }, shadow: cardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.5, w: 4.0, h: 0.05, fill: { color: C.brand } });

  const infoItems = [
    { label: "姓    名", value: "Ethan" },
    { label: "部    门", value: "技术研发部" },
    { label: "岗    位", value: "后端开发工程师" },
    { label: "入职日期", value: "2025年11月26日" },
  ];
  infoItems.forEach((item, i) => {
    const y = 1.8 + i * 0.5;
    s.addText(item.label, { x: 0.9, y, w: 1.1, h: 0.35, fontSize: 11, fontFace: F, color: C.g500, margin: 0, valign: "middle" });
    s.addText(item.value, { x: 2.1, y, w: 2.2, h: 0.35, fontSize: 13, fontFace: F, color: C.black, bold: true, margin: 0, valign: "middle" });
  });

  // Responsibilities card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.2, h: 2.5, fill: { color: C.g50 }, shadow: cardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.5, w: 4.2, h: 0.05, fill: { color: C.deep } });

  s.addText("岗位职责", { x: 5.5, y: 1.7, w: 3.6, h: 0.4, fontSize: 14, fontFace: F, color: C.black, bold: true, margin: 0 });

  s.addText([
    { text: "HCT 平台后端 API 开发与维护", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "RAG 检索链路搭建与持续优化", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "运营管理后台从 0 到 1 搭建", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "配合 MVP 内测及线上问题修复", options: { bullet: true, fontSize: 12, color: C.g600 } },
  ], { x: 5.5, y: 2.2, w: 3.6, h: 1.6, valign: "top", margin: 0, paraSpaceAfter: 8 });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 5 — 章节页: 工作成果
// ═══════════════════════════════════════════════════
addSectionSlide("02", "工作成果", "核心项目与关键交付");


// ═══════════════════════════════════════════════════
// SLIDE 6 — 时间线（逐项点击动画）
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "工作历程", "入职以来的关键里程碑");

  const steps = [
    { num: "11月", title: "入职融入", items: "熟悉业务 · 调研\nAgentScope · 数据库\n基础设计" },
    { num: "12月", title: "核心交付", items: "P1/P2 接口全链路\n交付 · RAG+MCP\n初步实现" },
    { num: "1月", title: "深度建设", items: "运营后台 0→1\nRAG 深度调优\n徽章/点赞/微信" },
    { num: "2月", title: "上线冲刺", items: "微信登录上线\n文章录入+ES\n项目正式上线" },
  ];

  // Connector line
  const lineY = 2.3;
  s.addShape(pres.shapes.LINE, { x: 1.2, y: lineY, w: 7.6, h: 0, line: { color: C.g300, width: 2.5 } });

  steps.forEach((step, i) => {
    const cx = 1.2 + i * (7.6 / 3);
    const animDelay = i * 0.5;

    // Circle
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.3, y: lineY - 0.3, w: 0.6, h: 0.6,
      fill: { color: C.brand },
      animate: { type: "appear", delay: animDelay }
    });
    // Month label
    s.addText(step.num, {
      x: cx - 0.3, y: lineY - 0.3, w: 0.6, h: 0.6,
      fontSize: 9, fontFace: F, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
    // Title
    s.addText(step.title, {
      x: cx - 0.8, y: 2.85, w: 1.6, h: 0.4,
      fontSize: 14, fontFace: F, color: C.black, bold: true, align: "center", margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
    // Details
    s.addText(step.items, {
      x: cx - 0.85, y: 3.25, w: 1.7, h: 1.2,
      fontSize: 11, fontFace: F, color: C.g600, align: "center", margin: 0, lineSpacingMultiple: 1.5,
      animate: { type: "appear", delay: animDelay }
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 7 — 亮点一：后端用户体系
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "后端用户体系搭建", "P1/P2 全链路设计与交付");

  // Left content
  s.addText([
    { text: "数据库与接口规范", options: { fontSize: 14, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "完成 P1、P2 两个阶段的数据库结构设计及接口规范输出，涵盖用户、企业关系等核心表结构", options: { fontSize: 12, color: C.g600, lineSpacingMultiple: 1.5, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "用户注册 / 验证码 / 企查查模块接口开发", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "阿里云国际短信服务集成（印尼地区）", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "Access Token 安全漏洞修复", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "MVP 多国家注册接口支持", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "用户手机号/邮箱绑定及密码校验优化", options: { bullet: true, fontSize: 12, color: C.g600 } },
  ], { x: 0.85, y: 1.5, w: 4.2, h: 3.3, valign: "top", margin: 0, paraSpaceAfter: 4 });

  // Right image placeholder
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 1.3, w: 4.0, h: 3.6, fill: { color: C.g100 }, rectRadius: 0.12 });
  s.addText("系统架构图\n（可替换为实际截图）", {
    x: 5.4, y: 2.5, w: 4.0, h: 1.0,
    fontSize: 12, fontFace: F, color: C.g400, align: "center", valign: "middle", margin: 0
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 8 — 亮点二：RAG 调优（逐项动画）
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "RAG 检索调优", "6 项优化策略，持续提升检索质量");

  const strategies = [
    { num: "01", title: "文档级去重", desc: "优先命中同一法规较新版本，避免重复文档干扰" },
    { num: "02", title: "Chunk 相似度去重", desc: "过滤高度重叠的文本片段，提升结果多样性" },
    { num: "03", title: "重排后低分过滤", desc: "移除重排后得分过低的 Chunk，保障答案质量" },
    { num: "04", title: "翻译稳定性优化", desc: "调参 LLM 温度，减少子查询翻译随机性" },
    { num: "05", title: "动态 top_k", desc: "按问题复杂度动态调整返回数量，提升检索效率" },
    { num: "06", title: "Embedding 模型优化", desc: "规避 JINA 并发限制，兼容自部署模型" },
  ];

  strategies.forEach((item, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = 0.6 + col * 3.1;
    const y = 1.5 + row * 1.65;
    const animDelay = i * 0.3;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.8, h: 1.4,
      fill: { color: C.g50 }, shadow: cardShadow(),
      animate: { type: "appear", delay: animDelay }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.8, h: 0.04,
      fill: { color: C.brand },
      animate: { type: "appear", delay: animDelay }
    });
    // Number
    s.addText(item.num, {
      x: x + 0.15, y: y + 0.15, w: 0.45, h: 0.4,
      fontSize: 16, fontFace: F, color: C.brand, bold: true, margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
    // Title
    s.addText(item.title, {
      x: x + 0.6, y: y + 0.15, w: 2.0, h: 0.4,
      fontSize: 13, fontFace: F, color: C.black, bold: true, margin: 0, valign: "middle",
      animate: { type: "appear", delay: animDelay }
    });
    // Desc
    s.addText(item.desc, {
      x: x + 0.15, y: y + 0.65, w: 2.5, h: 0.6,
      fontSize: 10, fontFace: F, color: C.g600, margin: 0, lineSpacingMultiple: 1.4,
      animate: { type: "appear", delay: animDelay }
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 9 — 亮点三：运营后台
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "运营管理后台 0→1", "独立完成从设计到上线的全链路交付");

  // Main content
  s.addText([
    { text: "核心功能模块", options: { fontSize: 14, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "用户状态管理：查看基本信息、积分、使用情况", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "用户备注能力：支持运营人员添加用户标记", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "管理员账号管理：支持禁用/启用管理员", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "文章录入系统：内容录入 + Elasticsearch 存储", options: { bullet: true, fontSize: 12, color: C.g600, breakLine: true } },
    { text: "", options: { fontSize: 6, breakLine: true } },
    { text: "实践方法", options: { fontSize: 14, bold: true, color: C.black, breakLine: true } },
    { text: "", options: { fontSize: 4, breakLine: true } },
    { text: "采用 VIBE-CODING + SPEC 模式，从需求分析到设计、开发、联调、上线全链路独立完成", options: { fontSize: 12, color: C.g600, lineSpacingMultiple: 1.5 } },
  ], { x: 0.85, y: 1.5, w: 8.55, h: 3.3, valign: "top", margin: 0, paraSpaceAfter: 4 });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 10 — 关键数字（逐项动画）
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "关键数据", "用数字说话");

  s.addShape(pres.shapes.OVAL, { x: 7.8, y: 3.2, w: 3.5, h: 3.5, fill: { color: C.light, transparency: 75 } });

  const stats = [
    { value: "50+", label: "核心接口交付", desc: "用户体系 · 企业认证 · 微信登录" },
    { value: "6 项", label: "RAG 优化策略", desc: "检索质量与效率持续提升" },
    { value: "3 大", label: "系统模块独立负责", desc: "用户体系 · RAG · 运营后台" },
  ];

  stats.forEach((stat, i) => {
    const x = 0.6 + i * 3.1;
    const animDelay = i * 0.5;

    s.addText(stat.value, {
      x, y: 1.4, w: 2.8, h: 1.2,
      fontSize: 56, fontFace: F, color: C.brand, bold: true, align: "center", valign: "middle", margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
    s.addText(stat.label, {
      x, y: 2.65, w: 2.8, h: 0.45,
      fontSize: 16, fontFace: F, color: C.black, bold: true, align: "center", margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.65, y: 3.2, w: 1.5, h: 0,
      line: { color: C.brand, width: 1.5 },
      animate: { type: "appear", delay: animDelay }
    });
    s.addText(stat.desc, {
      x, y: 3.35, w: 2.8, h: 0.4,
      fontSize: 11, fontFace: F, color: C.g600, align: "center", margin: 0,
      animate: { type: "appear", delay: animDelay }
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 11 — 章节页: 成长与反思
// ═══════════════════════════════════════════════════
addSectionSlide("03", "成长与反思", "收获总结与不足改进");


// ═══════════════════════════════════════════════════
// SLIDE 12 — 双栏：成长收获 + 不足改进（逐项动画）
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  s.transition = TRANSITION;

  addPageTitle(s, "成长收获与不足改进");

  // Left card - Growth
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.5, w: 4.15, h: 3.2, fill: { color: C.g50 }, shadow: cardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.5, w: 4.15, h: 0.05, fill: { color: C.brand } });

  s.addText("成长收获", { x: 0.9, y: 1.7, w: 3.5, h: 0.4, fontSize: 16, fontFace: F, color: C.brand, bold: true, margin: 0 });

  const growthItems = [
    "完整经历产品从设计→开发→测试→上线全链路，对产品迭代有了系统认知",
    "RAG 实战调优经验深厚，从嵌入、翻译、检索到重排的每个环节都有深度实践",
    "深度运用 AI 工具提效，形成 VIBE-CODING + SPEC 个人工作方法论",
  ];
  growthItems.forEach((item, i) => {
    s.addText([
      { text: String(i + 1) + ".", options: { bold: true, color: C.brand } },
      { text: " " + item, options: { color: C.g600 } },
    ], {
      x: 0.9, y: 2.2 + i * 0.85, w: 3.55, h: 0.75,
      fontSize: 12, fontFace: F, margin: 0, lineSpacingMultiple: 1.4, valign: "top",
      animate: { type: "appear", delay: i * 0.4 }
    });
  });

  // Right card - Improvement
  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 1.5, w: 4.15, h: 3.2, fill: { color: C.g50 }, shadow: cardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 1.5, w: 4.15, h: 0.05, fill: { color: C.deep } });

  s.addText("不足改进", { x: 5.55, y: 1.7, w: 3.5, h: 0.4, fontSize: 16, fontFace: F, color: C.deep, bold: true, margin: 0 });

  const improvItems = [
    "初期对 VIBE-CODING 模式不够熟悉，编码效率经历了一段适应期，现已形成稳定工作流",
    "前期对业务理解不够深入，导致部分设计返工。后续坚持先吃透需求再动手，减少无效开发",
  ];
  improvItems.forEach((item, i) => {
    s.addText([
      { text: String(i + 1) + ".", options: { bold: true, color: C.deep } },
      { text: " " + item, options: { color: C.g600 } },
    ], {
      x: 5.55, y: 2.2 + i * 1.1, w: 3.55, h: 0.95,
      fontSize: 12, fontFace: F, margin: 0, lineSpacingMultiple: 1.4, valign: "top",
      animate: { type: "appear", delay: (3 + i) * 0.4 }
    });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 13 — 章节页: 未来规划
// ═══════════════════════════════════════════════════
addSectionSlide("04", "未来规划", "技术深耕与发展方向");


// ═══════════════════════════════════════════════════
// SLIDE 14 — 未来规划（三栏卡片）
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.g50 };
  s.transition = TRANSITION;

  addPageTitle(s, "未来发展方向");

  const cards = [
    { num: "01", title: "技术深耕", desc: "持续优化 RAG 检索效果，夯实数据库与系统架构能力；探索模型部署与微调相关技术" },
    { num: "02", title: "AI 拓展", desc: "借助 AI 能力拓展更多业务板块，不局限于纯技术开发；深入 Agent 生态与工程化实践" },
    { num: "03", title: "业务融合", desc: "深入理解跨境合规业务场景，让技术方案更贴合实际需求；主动承担更多模块，提升协作效率" },
  ];

  cards.forEach((card, i) => {
    const x = 0.6 + i * 3.1;
    const cardY = 1.5;

    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: 2.8, h: 3.2, fill: { color: C.white }, shadow: cardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: cardY, w: 2.8, h: 0.05, fill: { color: C.brand } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.85, y: cardY + 0.35, w: 1.1, h: 1.1, fill: { color: C.ice } });
    s.addText(card.num, { x: x + 0.85, y: cardY + 0.35, w: 1.1, h: 1.1, fontSize: 26, fontFace: F, color: C.brand, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(card.title, { x: x + 0.2, y: cardY + 1.65, w: 2.4, h: 0.45, fontSize: 15, fontFace: F, color: C.black, bold: true, align: "center", margin: 0 });
    s.addText(card.desc, { x: x + 0.2, y: cardY + 2.1, w: 2.4, h: 0.9, fontSize: 11, fontFace: F, color: C.g500, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.5 });
  });

  addFooter(s);
})();


// ═══════════════════════════════════════════════════
// SLIDE 15 — 结束页
// ═══════════════════════════════════════════════════
(function() {
  const s = pres.addSlide();
  s.background = { color: C.black };
  s.transition = TRANSITION;

  s.addShape(pres.shapes.OVAL, { x: -1.5, y: -1.5, w: 5, h: 5, fill: { color: C.deep, transparency: 75 } });
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: 3, w: 4.5, h: 4.5, fill: { color: C.brand, transparency: 85 } });

  s.addText("谢谢", { x: 0, y: 1.1, w: 10, h: 1.2, fontSize: 48, fontFace: F, color: C.white, bold: true, align: "center", margin: 0 });
  s.addText("THANK YOU", { x: 0, y: 2.2, w: 10, h: 0.5, fontSize: 13, fontFace: F, color: C.g500, align: "center", charSpacing: 6, margin: 0 });

  addDots(s, 4.78, 2.85, C.brand, [0, 30, 60]);

  s.addText([
    { text: "Ethan  ·  技术研发部  ·  后端开发工程师", options: { fontSize: 12, bold: true, color: C.g400 } },
  ], { x: 0, y: 3.2, w: 10, h: 0.5, align: "center", margin: 0 });

  s.addImage({ path: LOGO.whiteH, x: 3.5, y: 4.1, w: 3.0, h: 1.1, sizing: { type: "contain", w: 3.0, h: 1.1 } });
})();


// ═══════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════
const outputPath = path.join(__dirname, "Ethan-Review-2026-02.pptx");
pres.writeFile({ fileName: outputPath })
  .then(() => console.log("SUCCESS: " + outputPath))
  .catch(err => console.error("ERROR:", err));
