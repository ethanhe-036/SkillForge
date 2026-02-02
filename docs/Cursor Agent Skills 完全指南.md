# Cursor Agent Skills 完全指南

> 本文档旨在帮助团队了解和使用 Cursor Agent Skills，提升 AI 辅助开发效率。

## 目录

- [什么是 Agent Skills](#什么是-agent-skills)
- [核心特性](#核心特性)
- [工作原理](#工作原理)
- [目录结构与存放位置](#目录结构与存放位置)
- [SKILL.md 文件格式规范](#skillmd-文件格式规范)
- [编写有效的 Description](#编写有效的-description)
- [核心编写原则](#核心编写原则)
- [常用设计模式](#常用设计模式)
- [反模式与注意事项](#反模式与注意事项)
- [完整示例](#完整示例)
- [Skills vs Rules 对比](#skills-vs-rules-对比)
- [参考资源](#参考资源)

---

## 什么是 Agent Skills

Agent Skills 是一个**开放标准**，用于扩展 AI 代理的专业能力。它本质上是一个可移植的、版本控制的"技能包"，可以教会 AI 代理如何执行特定领域的任务。

简单来说，Skill 就是一套**领域专业知识和工作流程的封装**，让 AI 代理在执行特定任务时更加专业和高效。

### 适用场景

- **代码审查**：按照团队标准进行 PR Review
- **提交规范**：生成符合项目风格的 commit message
- **部署流程**：自动化应用部署到各环境
- **文档处理**：PDF 提取、表单填写、文档合并
- **数据分析**：Excel 分析、图表生成
- **特定领域操作**：数据库迁移、API 调用等

---

## 核心特性

Agent Skills 具有四个核心特性：

| 特性 | 说明 |
|------|------|
| **可移植 (Portable)** | 可在任何支持 Agent Skills 标准的代理中使用 |
| **版本控制 (Version-controlled)** | 以文件形式存储，可通过 Git 跟踪，也可通过 GitHub 链接安装 |
| **可执行 (Executable)** | 可包含脚本和代码，代理可直接执行以完成任务 |
| **渐进式加载 (Progressive)** | 按需加载资源，保持上下文使用的高效性 |

---

## 工作原理

```
┌─────────────────────────────────────────────────────────────┐
│                      Cursor 启动                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              自动发现所有 Skill 目录中的技能                   │
│  (加载 name 和 description，约 100 tokens/skill)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    用户发起对话/任务                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│      代理根据上下文判断哪些 Skill 相关                        │
│      或用户通过 /skill-name 手动调用                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│          加载完整的 SKILL.md 内容 (< 5000 tokens)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│      按需加载 scripts/、references/、assets/ 中的资源        │
└─────────────────────────────────────────────────────────────┘
```

---

## 目录结构与存放位置

### 存放位置

Skills 会从以下位置自动加载：

| 位置 | 作用域 | 说明 |
|------|--------|------|
| `.cursor/skills/` | 项目级 | 仅当前项目可用，可与团队共享 |
| `~/.cursor/skills/` | 用户级 | 全局可用，个人专属 |
| `.claude/skills/` | 项目级 | Claude 兼容目录 |
| `~/.claude/skills/` | 用户级 | Claude 兼容目录（全局） |
| `.codex/skills/` | 项目级 | Codex 兼容目录 |
| `~/.codex/skills/` | 用户级 | Codex 兼容目录（全局） |

> **注意**：`~/.cursor/skills-cursor/` 是 Cursor 内置技能目录，**禁止在此创建自定义技能**。

### 目录布局

一个完整的 Skill 目录结构如下：

```
skill-name/
├── SKILL.md              # 必需 - 主要指令文件
├── scripts/              # 可选 - 可执行脚本
│   ├── deploy.sh
│   └── validate.py
├── references/           # 可选 - 详细参考文档
│   ├── REFERENCE.md
│   └── api-guide.md
└── assets/               # 可选 - 静态资源
    ├── template.json
    └── config-example.yaml
```

---

## SKILL.md 文件格式规范

每个 Skill 必须包含一个 `SKILL.md` 文件，由 YAML frontmatter 和 Markdown 正文组成。

### 基本结构

```markdown
---
name: your-skill-name
description: 技能的简短描述，说明它做什么以及何时使用。
---

# 技能名称

## 使用场景
- 场景1
- 场景2

## 操作步骤
1. 步骤1
2. 步骤2

## 示例
具体的使用示例...
```

### Frontmatter 字段说明

#### 必需字段

| 字段 | 约束 | 说明 |
|------|------|------|
| `name` | 1-64字符，仅限小写字母、数字和连字符 | 技能的唯一标识符，必须与父目录名匹配 |
| `description` | 1-1024字符 | 描述技能功能和使用时机，用于代理判断相关性 |

#### 可选字段

| 字段 | 说明 |
|------|------|
| `license` | 许可证名称或引用 |
| `compatibility` | 环境要求（最多500字符） |
| `metadata` | 任意键值对，如 `author`、`version` |
| `allowed-tools` | 预授权工具列表（实验性功能） |
| `disable-model-invocation` | 设为 `true` 时，技能仅在用户显式调用时激活 |

### name 字段规则

```yaml
# ✅ 正确示例
name: pdf-processing
name: code-review
name: data-analysis

# ❌ 错误示例
name: PDF-Processing    # 不允许大写
name: -pdf              # 不能以连字符开头
name: pdf--processing   # 不允许连续连字符
name: pdf_processing    # 不允许下划线
```

---

## 编写有效的 Description

Description 是技能发现的**关键**，代理通过它决定何时应用技能。

### 最佳实践

1. **使用第三人称**（描述会被注入到系统提示中）

```yaml
# ✅ Good
description: 处理 Excel 文件并生成报告

# ❌ Avoid
description: 我可以帮你处理 Excel 文件
description: 你可以用这个来处理 Excel 文件
```

2. **具体且包含触发关键词**

```yaml
# ✅ Good - 具体且包含多个触发词
description: 从 PDF 文件中提取文本和表格，填写表单，合并文档。当处理 PDF 文件或用户提到 PDF、表单、文档提取时使用。

# ❌ Vague - 太模糊
description: 帮助处理文档
```

3. **同时包含 WHAT 和 WHEN**

```yaml
description: |
  [WHAT] 分析 Excel 电子表格，创建数据透视表，生成图表。
  [WHEN] 当分析 Excel 文件、电子表格、表格数据或 .xlsx 文件时使用。
```

### Description 示例

```yaml
# Git 提交助手
description: 通过分析 git diff 生成描述性的提交消息。当用户请求帮助编写提交消息或审查暂存更改时使用。

# 代码审查
description: 按照团队标准审查代码质量、安全性和最佳实践。当审查 PR、代码更改或用户请求代码审查时使用。

# 应用部署
description: 将应用部署到 staging 或 production 环境。当部署代码或用户提到部署、发布、环境时使用。
```

---

## 核心编写原则

### 1. 简洁至上

上下文窗口与对话历史、其他技能和请求共享，每个 token 都很宝贵。

**默认假设**：代理已经非常聪明，只添加它不知道的上下文。

```markdown
## ✅ Good（简洁）

使用 pdfplumber 提取文本：

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

## ❌ Bad（冗长）

PDF（便携式文档格式）文件是一种常见的文件格式，包含文本、图像和
其他内容。要从 PDF 中提取文本，您需要使用一个库。有许多可用于
PDF 处理的库，但我们推荐 pdfplumber，因为它易于使用且能处理大
多数情况...
```

### 2. 保持 SKILL.md 在 500 行以内

主 SKILL.md 文件应简洁，详细内容移至单独文件。

### 3. 渐进式披露

将基本信息放在 SKILL.md 中，详细参考资料放在单独文件中：

```markdown
# PDF 处理

## 快速开始
[基本指令]

## 额外资源
- 完整 API 详情见 [reference.md](references/reference.md)
- 使用示例见 [examples.md](references/examples.md)
```

> **重要**：保持引用层级为一层，直接从 SKILL.md 链接到参考文件，避免深层嵌套。

### 4. 设置适当的自由度

根据任务的脆弱性匹配具体程度：

| 自由度 | 适用场景 | 示例 |
|--------|----------|------|
| **高**（文本指令） | 多种有效方法，依赖上下文 | 代码审查指南 |
| **中**（伪代码/模板） | 有首选模式但允许变化 | 报告生成 |
| **低**（具体脚本） | 脆弱操作，一致性关键 | 数据库迁移 |

---

## 常用设计模式

### 1. 模板模式

提供输出格式模板：

```markdown
## 报告结构

使用此模板：

```markdown
# [分析标题]

## 执行摘要
[关键发现的一段式概述]

## 主要发现
- 发现1及支持数据
- 发现2及支持数据

## 建议
1. 具体可操作的建议
2. 具体可操作的建议

### 2. 示例模式

当输出质量依赖于示例时使用：

```markdown
## 提交消息格式

**示例 1:**
输入: 添加了使用 JWT 令牌的用户认证
输出:
```
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

**示例 2:**
输入: 修复了日期显示不正确的 bug
输出:
```
fix(reports): correct date formatting in timezone conversion

Use UTC timestamps consistently across report generation
```
```

### 3. 工作流模式

将复杂操作分解为清晰步骤：

```markdown
## 表单填写工作流

复制此清单并跟踪进度：

```
任务进度:
- [ ] 步骤1: 分析表单
- [ ] 步骤2: 创建字段映射
- [ ] 步骤3: 验证映射
- [ ] 步骤4: 填写表单
- [ ] 步骤5: 验证输出
```

**步骤 1: 分析表单**
运行: `python scripts/analyze_form.py input.pdf`
...
```

### 4. 条件工作流模式

引导通过决策点：

```markdown
## 文档修改工作流

1. 确定修改类型：

   **创建新内容?** → 遵循下方"创建工作流"
   **编辑现有内容?** → 遵循下方"编辑工作流"

2. 创建工作流:
   - 使用 docx-js 库
   - 从头构建文档
   ...
```

### 5. 反馈循环模式

对质量关键任务实施验证循环：

```markdown
## 文档编辑流程

1. 进行编辑
2. **立即验证**: `python scripts/validate.py output/`
3. 如果验证失败:
   - 查看错误消息
   - 修复问题
   - 再次运行验证
4. **仅在验证通过后继续**
```

---

## 反模式与注意事项

### 避免的做法

| 反模式 | 正确做法 |
|--------|----------|
| Windows 风格路径 `scripts\helper.py` | 使用 Unix 风格 `scripts/helper.py` |
| 提供太多选项让人困惑 | 提供默认选项，附带替代方案 |
| 时间敏感信息 "2025年8月前..." | 使用"当前方法"和"旧模式（已弃用）"分区 |
| 术语不一致 | 选择一个术语并全程使用 |
| 模糊的技能名 `helper`、`utils` | 具体名称 `pdf-processing`、`code-review` |

### 示例：避免太多选项

```markdown
# ❌ Bad - 令人困惑
"你可以使用 pypdf，或 pdfplumber，或 PyMuPDF，或..."

# ✅ Good - 提供默认值和逃生舱
"使用 pdfplumber 进行文本提取。
对于需要 OCR 的扫描 PDF，改用 pdf2image 配合 pytesseract。"
```

---

## 完整示例

### 目录结构

```
code-review/
├── SKILL.md
├── STANDARDS.md
└── examples.md
```

### SKILL.md 内容

```markdown
---
name: code-review
description: 按照团队标准审查代码质量、安全性和可维护性。当审查 PR、检查代码更改或用户请求代码审查时使用。
---

# 代码审查

## 快速开始

审查代码时：

1. 检查正确性和潜在 bug
2. 验证安全最佳实践
3. 评估代码可读性和可维护性
4. 确保测试充分

## 审查清单

- [ ] 逻辑正确且处理边缘情况
- [ ] 无安全漏洞（SQL 注入、XSS 等）
- [ ] 代码遵循项目风格规范
- [ ] 函数大小适当且职责单一
- [ ] 错误处理全面
- [ ] 测试覆盖更改

## 提供反馈

使用以下格式：
- 🔴 **关键**: 合并前必须修复
- 🟡 **建议**: 考虑改进
- 🟢 **锦上添花**: 可选增强

## 额外资源

- 详细编码标准见 [STANDARDS.md](STANDARDS.md)
- 示例审查见 [examples.md](examples.md)
```

---

## Skills vs Rules 对比

| 特性 | Skills | Rules |
|------|--------|-------|
| **激活方式** | 代理智能判断或手动调用 `/skill-name` | 始终应用或基于 glob 模式 |
| **内容类型** | 程序化"如何做"指令 | 声明式约束和规范 |
| **上下文效率** | 按需加载，渐进式披露 | 始终加载（always apply）或条件加载 |
| **适用场景** | 特定工作流、领域任务 | 编码规范、项目约定 |
| **灵活性** | 更灵活，支持脚本执行 | 更约束性，适合强制规范 |

### 何时使用 Skills

- 需要动态上下文发现
- 程序化的"如何做"指令
- 可能需要执行脚本
- 特定领域的复杂工作流

### 何时使用 Rules

- 需要始终强制执行的规范
- 基于文件类型的约束
- 简单的编码标准
- 项目级别的约定

---

## 查看和管理 Skills

### 查看已发现的 Skills

1. 打开 **Cursor Settings** (Mac: `Cmd+Shift+J`, Win/Linux: `Ctrl+Shift+J`)
2. 导航到 **Rules** 标签页
3. Skills 显示在 **Agent Decides** 部分

### 从 GitHub 安装 Skills

1. 打开 **Cursor Settings → Rules**
2. 在 **Project Rules** 部分点击 **Add Rule**
3. 选择 **Remote Rule (Github)**
4. 输入 GitHub 仓库 URL

### 迁移现有 Rules 和 Commands

在 Agent 对话中输入 `/migrate-to-skills`，代理会自动将符合条件的动态规则和斜杠命令转换为 Skills。

---

## 创建 Skill 的工作流程

### 阶段 1：需求收集

1. 技能的目的和主要用例
2. 存储位置（个人级 vs 项目级）
3. 触发场景
4. 特定要求或约束
5. 现有的示例或模式

### 阶段 2：设计

1. 草拟技能名称（小写、连字符、最多64字符）
2. 编写具体的第三人称描述
3. 规划需要的主要章节
4. 确定是否需要支持文件或脚本

### 阶段 3：实现

1. 创建目录结构
2. 编写带 frontmatter 的 SKILL.md
3. 创建支持性参考文件
4. 创建必要的实用脚本

### 阶段 4：验证

- [ ] SKILL.md 在 500 行以内
- [ ] description 具体且包含触发词
- [ ] description 同时包含 WHAT 和 WHEN
- [ ] 使用第三人称编写
- [ ] 全文术语一致
- [ ] 示例具体而非抽象
- [ ] 文件引用层级为一层
- [ ] 适当使用渐进式披露
- [ ] 工作流有清晰步骤
- [ ] 无时间敏感信息

---

## 参考资源

- **官方文档**: [cursor.com/docs/context/skills](https://cursor.com/docs/context/skills)
- **Agent Skills 规范**: [agentskills.io/specification](https://agentskills.io/specification)
- **验证工具**: [github.com/agentskills/agentskills/tree/main/skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref)

---

## 总结

Agent Skills 是一个强大的机制，用于扩展 AI 代理的专业能力。通过良好的设计和编写，Skills 可以：

1. **提高效率**：封装重复性工作流，减少重复解释
2. **保持一致性**：确保团队遵循相同的标准和流程
3. **知识沉淀**：将领域专业知识编码化，便于分享和传承
4. **上下文优化**：通过渐进式加载，高效利用有限的上下文窗口

建议从团队最常见的工作流开始，逐步构建自己的 Skill 库。

---

*文档版本: 2026.02.01*
*适用于: Cursor 2.4+*