# Cursor Agent Skills 完整介绍指南

> 本文档旨在帮助团队成员快速了解 Cursor Agent Skills 的概念、结构、使用方法以及与 MCP 的区别。

---

## 目录

1. [什么是 SKILL](#什么是-skill)
2. [SKILL 的组成结构](#skill-的组成结构)
3. [SKILL 与 MCP 的区别](#skill-与-mcp-的区别)
4. [通俗易懂的例子](#通俗易懂的例子)
5. [如何通过 SKILL 提效](#如何通过-skill-提效)
6. [创建 SKILL 的最佳实践](#创建-skill-的最佳实践)
7. [常见模式与反模式](#常见模式与反模式)
8. [总结](#总结)

---

## 什么是 SKILL

### 定义

**Agent Skills（技能）** 是 Cursor 支持的一种开放标准，用于为 AI Agent 扩展专门能力。它将**特定领域的知识和工作流打包成可复用的模块**，Agent 会根据上下文自动调用相关技能。

简单来说，SKILL 就是一份**教给 AI 如何完成特定任务的说明书**。

### 核心特点

| 特点 | 说明 |
|------|------|
| **可复用性** | 一次编写，多次使用，跨项目共享 |
| **自动触发** | Agent 根据对话上下文自动判断并调用 |
| **领域专注** | 每个 SKILL 专注解决一类特定问题 |
| **易于维护** | 基于 Markdown 格式，版本控制友好 |

### 适用场景

- 团队代码审查标准化
- 特定格式的提交信息生成
- 数据库查询模式
- 文档生成模板
- 特定领域的工作流程

---

## SKILL 的组成结构

### 目录布局

每个 SKILL 是一个包含 SKILL.md 文件的目录：

```
skill-name/
├── SKILL.md              # 必需 - 主要指令文件
├── reference.md          # 可选 - 详细参考文档
├── examples.md           # 可选 - 使用示例
└── scripts/              # 可选 - 工具脚本
    ├── validate.py
    └── helper.sh
```

### 存储位置

| 类型 | 路径 | 作用域 |
|------|------|--------|
| 个人技能 | ~/.cursor/skills/skill-name/ | 在你所有项目中可用 |
| 项目技能 | .cursor/skills/skill-name/ | 与项目仓库共享给所有协作者 |

> **注意**：不要在 ~/.cursor/skills-cursor/ 目录下创建技能，该目录是 Cursor 内置技能的保留目录。

### SKILL.md 文件结构

每个 SKILL.md 文件由两部分组成：

#### 1. YAML Frontmatter（必需）

```yaml
---
name: your-skill-name
description: Brief description of what this skill does and when to use it
---
```

| 字段 | 要求 | 用途 |
|------|------|------|
| name | 最多64字符，仅小写字母/数字/连字符 | 技能的唯一标识符 |
| description | 最多1024字符，不能为空 | 帮助 Agent 判断何时应用此技能 |

#### 2. Markdown Body（主体内容）

```markdown
# Your Skill Name

## Instructions
清晰的分步指导说明。

## Examples
具体的使用示例。
```

### 完整示例

```markdown
---
name: code-review
description: Review code for quality, security, and maintainability following team standards. Use when reviewing pull requests, examining code changes, or when the user asks for a code review.
---

# Code Review

## Quick Start

When reviewing code:

1. Check for correctness and potential bugs
2. Verify security best practices
3. Assess code readability and maintainability
4. Ensure tests are adequate

## Review Checklist

- [ ] Logic is correct and handles edge cases
- [ ] No security vulnerabilities (SQL injection, XSS, etc.)
- [ ] Code follows project style conventions
- [ ] Functions are appropriately sized and focused
- [ ] Error handling is comprehensive
- [ ] Tests cover the changes

## Providing Feedback

Format feedback as:
- Critical: Must fix before merge
- Suggestion: Consider improving
- Nice to have: Optional enhancement
```

---

## SKILL 与 MCP 的区别

这是团队经常混淆的两个概念，它们都是 Cursor 中扩展 AI 能力的方式，但本质完全不同。

### 一句话区分

> **SKILL = 静态知识指令** | **MCP = 动态工具连接**

### 详细对比

| 维度 | SKILL（技能） | MCP（模型上下文协议） |
|------|--------------|---------------------|
| **本质** | Markdown 格式的指令文档 | 客户端-服务器通信协议 |
| **作用** | 教 AI "怎么做" | 让 AI "能做什么" |
| **存储** | 本地 .md 文件 | 运行中的服务进程 |
| **交互** | 单向（AI 读取指令） | 双向（请求-响应） |
| **扩展能力** | 知识、流程、模板 | 外部工具、数据源、API |
| **技术门槛** | 低（只需会写 Markdown） | 较高（需要开发服务端） |
| **实时性** | 静态内容 | 动态获取实时数据 |

### MCP 架构简介

MCP（Model Context Protocol）是由 Anthropic 推出的开放协议，采用客户端-服务器架构：

```
┌─────────────────────────────────────────────────────────┐
│                    Host（Cursor IDE）                    │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ MCP Client  │    │ MCP Client  │    │ MCP Client  │ │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘ │
└─────────┼──────────────────┼──────────────────┼────────┘
          │                  │                  │
          ▼                  ▼                  ▼
   ┌────────────┐     ┌────────────┐     ┌────────────┐
   │ GitHub MCP │     │ Database   │     │ Browser    │
   │  Server    │     │ MCP Server │     │ MCP Server │
   └────────────┘     └────────────┘     └────────────┘
```

MCP 的核心能力包括：
- **Tools（工具）**：可被模型调用的外部功能
- **Resources（资源）**：结构化数据（文件、数据库等）
- **Prompts（提示）**：参数化的提示模板

### 形象比喻

想象你有一个超级聪明的助手：

| 场景 | SKILL 类比 | MCP 类比 |
|------|-----------|----------|
| **是什么** | 给助手一本《公司手册》 | 给助手配一部能打电话的手机 |
| **能做什么** | 助手按照手册规范工作 | 助手能打电话获取外部信息 |
| **例子** | "写代码要遵循这些规范" | "帮我查一下 GitHub 上的 Issue" |

### 何时选择哪个？

```
需要扩展 AI 能力
       │
       ├── 是关于"知识/流程/规范"吗？
       │        │
       │        └── 是 --> 使用 SKILL
       │                   例：代码规范、提交格式、审查流程
       │
       └── 是关于"连接外部系统"吗？
                │
                └── 是 --> 使用 MCP
                           例：查询数据库、操作 GitHub、浏览网页
```

---

## 通俗易懂的例子

### 例子 1：新员工培训场景

**没有 SKILL 的情况：**

```
你：帮我审查这段代码
AI：[使用通用标准审查，可能不符合公司规范]

你：不对，我们公司要求必须检查 SQL 注入...
AI：好的，让我重新审查...

你：还有，我们的命名规范是...
AI：明白了，让我再改...

（每次都要重复说明规范）
```

**有 SKILL 的情况：**

```
你：帮我审查这段代码
AI：[自动读取 code-review SKILL，按照公司规范审查]
   - 符合命名规范
   - 发现潜在 SQL 注入风险（需修复）
   - 建议增加单元测试
```

### 例子 2：程序员日常场景

假设团队有统一的 Git 提交信息格式要求。

**创建一个 commit-message SKILL：**

```markdown
---
name: commit-message
description: Generate commit messages following team conventions. Use when the user asks for help writing commit messages or wants to commit changes.
---

# Commit Message Generator

## Format

[type](scope): description

## Types
- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- refactor: 代码重构

## Examples

Input: Added user login with OAuth
Output: feat(auth): add OAuth-based user authentication

Input: Fixed date display bug in reports
Output: fix(reports): correct date formatting in exports
```

**使用效果：**

```
你：帮我生成这次改动的提交信息
AI：根据你的改动，建议提交信息为：
    feat(api): add rate limiting middleware
```

### 例子 3：非程序员场景

假设市场部门需要经常生成社交媒体文案。

**创建一个 social-media-copy SKILL：**

```markdown
---
name: social-media-copy
description: Generate social media copy following brand guidelines. Use when creating posts for Twitter, LinkedIn, or WeChat.
---

# Social Media Copy Generator

## Brand Voice
- 专业但不刻板
- 使用简洁有力的语言
- 适当使用 emoji

## Platform Guidelines

### Twitter/X
- 限制 280 字符
- 包含 1-2 个相关 hashtag

### LinkedIn
- 专业正式语调
- 第一行要吸引注意力

### 微信公众号
- 开头要有吸引力的标题
- 段落简短，适合手机阅读
```

---

## 如何通过 SKILL 提效

### 程序员提效场景

| 场景 | 传统方式 | 使用 SKILL 后 | 效率提升 |
|------|----------|--------------|---------|
| **代码审查** | 手动对照规范检查 | AI 自动按规范审查 | 约70% |
| **写提交信息** | 思考格式+内容 | AI 直接生成标准格式 | 约80% |
| **生成测试用例** | 手动编写边界条件 | AI 按团队标准生成 | 约60% |
| **文档编写** | 从头构思结构 | AI 按模板生成初稿 | 约50% |
| **代码重构** | 逐步分析+改造 | AI 按最佳实践指导 | 约40% |

**推荐的程序员 SKILL：**

1. **code-review** - 代码审查规范
2. **commit-message** - 提交信息格式
3. **api-design** - API 设计规范
4. **test-generation** - 测试用例生成
5. **error-handling** - 错误处理模式

### 非程序员提效场景

| 场景 | 传统方式 | 使用 SKILL 后 | 效率提升 |
|------|----------|--------------|---------|
| **写周报** | 回忆+整理+格式化 | AI 按模板快速生成 | 约60% |
| **会议纪要** | 手动整理要点 | AI 按格式自动提取 | 约70% |
| **邮件撰写** | 斟酌措辞+格式 | AI 按场景模板生成 | 约50% |
| **数据报告** | 手动分析+排版 | AI 按模板结构化输出 | 约55% |

**推荐的非程序员 SKILL：**

1. **weekly-report** - 周报生成模板
2. **meeting-notes** - 会议纪要格式
3. **email-templates** - 邮件模板库
4. **presentation-outline** - PPT 大纲生成
5. **data-summary** - 数据摘要格式

### 团队协作提效

```
┌─────────────────────────────────────────────────────┐
│                    共享 SKILL 库                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │代码审查  │ │提交规范  │ │文档模板  │ │ 更多...│ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬───┘ │
└───────┼────────────┼────────────┼────────────┼─────┘
        │            │            │            │
        ▼            ▼            ▼            ▼
   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
   │ 开发者A │   │ 开发者B │   │ 产品经理 │   │ 设计师 │
   └────────┘   └────────┘   └────────┘   └────────┘
   
   所有人使用统一标准 --> 减少沟通成本 --> 提升整体效率
```

---

## 创建 SKILL 的最佳实践

### 1. 保持简洁

SKILL.md 主体文件建议控制在 **500 行以内**。Agent 的上下文窗口是有限的，每个 token 都很宝贵。

**好的做法：**

```markdown
## 提取 PDF 文本

使用 pdfplumber：

import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

**不好的做法：**

```markdown
## 提取 PDF 文本

PDF（便携式文档格式）是一种常见的文件格式，包含文本、图像和其他内容。
要从 PDF 中提取文本，你需要使用一个库。有很多库可用于 PDF 处理，
但我们推荐 pdfplumber，因为它易于使用且能处理大多数情况...
（冗长的解释 AI 已经知道的内容）
```

### 2. 描述要具体

描述字段是 Agent 决定是否使用此 SKILL 的关键依据。

**好的描述：**

```yaml
description: Review code for quality, security, and maintainability following team standards. Use when reviewing pull requests, examining code changes, or when the user asks for a code review.
```

**不好的描述：**

```yaml
description: Helps with documents
```

### 3. 使用渐进式披露

将核心内容放在 SKILL.md，详细参考放在单独文件。

```markdown
# PDF Processing

## Quick Start
[核心指令]

## Additional Resources
- For complete API details, see reference.md
- For usage examples, see examples.md
```

### 4. 包含具体示例

```markdown
## Commit Message Format

Example 1:
Input: Added user authentication with JWT
Output: feat(auth): implement JWT-based authentication

Example 2:
Input: Fixed date display bug
Output: fix(reports): correct date formatting in timezone conversion
```

---

## 常见模式与反模式

### 推荐模式

#### 模板模式

```markdown
## Report Structure

Use this template:

# [Analysis Title]

## Executive Summary
[One-paragraph overview]

## Key Findings
- Finding 1
- Finding 2

## Recommendations
1. Recommendation 1
2. Recommendation 2
```

#### 工作流模式

```markdown
## Form Filling Workflow

Progress Checklist:
- [ ] Step 1: Analyze the form
- [ ] Step 2: Create field mapping
- [ ] Step 3: Fill the form
- [ ] Step 4: Verify output
```

#### 条件分支模式

```markdown
## Document Modification

1. Determine the modification type:

   Creating new content? --> Follow "Creation workflow"
   Editing existing? --> Follow "Editing workflow"
```

### 反模式

| 反模式 | 问题 | 正确做法 |
|--------|------|---------|
| 提供过多选项 | "你可以用 A，或 B，或 C..." | 提供默认推荐 + 备选方案 |
| 时间敏感信息 | "2025 年 8 月前用旧 API" | 使用"当前方法"+"旧方法"分区 |
| 术语不一致 | 混用 "URL"/"路径"/"端点" | 全文统一使用一个术语 |
| 模糊的技能名 | helper、utils、tools | 使用描述性名称如 pdf-processing |

---

## 总结

### SKILL 是什么

- **本质**：教给 AI 如何完成特定任务的 Markdown 指令文件
- **作用**：将团队知识、工作流程、规范标准打包成可复用模块
- **优势**：统一标准、减少重复沟通、提升效率

### SKILL vs MCP 一句话总结

| | SKILL | MCP |
|---|-------|-----|
| 类比 | 给助手的《工作手册》| 给助手的《工具箱》|
| 功能 | 教 AI 怎么做 | 让 AI 能做更多 |
| 难度 | 写 Markdown | 开发服务端 |

### 快速上手建议

1. **从简单开始**：先创建一个团队常用的 SKILL（如提交信息格式）
2. **收集反馈**：让团队成员使用并提出改进建议
3. **逐步扩展**：根据实际需求添加更多 SKILL
4. **版本管理**：将项目 SKILL 纳入 Git 管理，便于团队协作

### 相关资源

- Cursor 官方文档: https://docs.cursor.com
- Agent Skills 开放标准: https://agentskills.io
- Anthropic 官方 Skills 示例: https://github.com/anthropics/skills

---

*本文档最后更新：2026年2月*