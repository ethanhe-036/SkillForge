# Agent Skills 使用指南

> **作者：** Aether&Ethan
> **日期：** 2026-02-02
> **目标受众：** 程序员、开发者、AI 工具使用者

---

## 目录

1. [什么是 Agent Skills](#一什么是-agent-skills)
2. [核心特性](#二核心特性)
3. [目录结构与存放位置](#三目录结构与存放位置)
4. [SKILL.md 文件结构](#skillmd-文件结构)
5. [核心编写原则](#四核心编写原则)
6. [SKILL 与 MCP 的区别](#五skill-与-mcp-的区别)

---

## 一、什么是 Agent Skills

- Agent Skills 是一个开放标准，本质上是可移植、版本控制的"技能包"——将领域专业知识和工作流程封装为清晰的指令文档，明确告诉 AI 代理何时触发（When）、如何执行（How）、产出什么（What）。与一次性的 Prompt 不同，Skill 是可长期复用、输入输出明确的能力模块，强调稳定性和工程化维护。而 Prompt 更偏向临时性、探索性和即兴交互，两者在设计目标和工程要求上完全不同。

### 适用场景

- **代码审查**：按照团队标准进行 PR Review
- **部署流程**：自动化应用部署到各环境
- **文档处理**：PDF 提取、表单填写、文档合并
- **数据分析**：Excel 分析、图表生成
- **特定领域操作**：数据库迁移、API 调用等
- **媒体创作**: 图像生成、视频制作
- **重复执行**: 固定流程化场景（生成符合项目风格的 commit message）


---

## 二、核心特性

Agent Skills 具有四个核心特性：

| 特性 | 说明 |
|------|------|
| **可移植 (Portable)** | 可在任何支持 Agent Skills 标准的代理中使用 |
| **版本控制 (Version-controlled)** | 以文件形式存储，可通过 Git 跟踪，也可通过 GitHub 链接安装 |
| **可执行 (Executable)** | 可包含脚本和代码，代理可直接执行以完成任务 |
| **渐进式加载 (Progressive)** | 按需加载资源，保持上下文使用的高效性 |

---

## 三、目录结构与存放位置

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
├── SKILL.md                      # 必需 - 主要指令文件
│   ├── YAML frontmatter          # 必需 - 元数据
│   │   ├── name:                 # 必需 - 技能名称
│   │   └── description:          # 必需 - 技能描述
│   └── Markdown instructions     # 必需 - 指令内容
└── Bundled Resources/            # 可选 - 捆绑资源
    ├── scripts/                  # 可执行脚本 (Python/Bash/等)
    │   ├── deploy.sh
    │   └── validate.py
    ├── references/               # 参考文档，按需加载到上下文
    │   ├── REFERENCE.md
    │   └── api-guide.md
    └── assets/                   # 输出资源 (模板、图标、字体等)
        ├── template.json
        └── config-example.yaml
```

---

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

#### 细节：

- 编写有效的 Description
  - Description 是技能发现的**关键**，代理通过它决定何时应用技能。
- 最佳实践

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

#### 2. Markdown Body（主体内容）

```markdown
# Your Skill Name

## Instructions
清晰的分步指导说明。

## Examples
具体的使用示例。
```

## 四、核心编写原则

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
```

```markdown
## ❌ Bad（冗长）

PDF（便携式文档格式）文件是一种常见的文件格式，包含文本、图像和
其他内容。要从 PDF 中提取文本，您需要使用一个库。有许多可用于
PDF 处理的库，但我们推荐 pdfplumber，因为它易于使用且能处理大
多数情况...
```

### 2. 保持 SKILL.md 在 500 行以内

```
主 SKILL.md 文件应简洁，详细内容移至单独文件。
```

### 3. 渐进式披露 - 核心原则

- 渐进式披露最初是一个 UX 设计原则，核心思想是：

  - 初始只展示最重要的内容
  - 高级功能和详细信息按需展示
  - 解决"用户既想要强大功能，又想要简洁界面"的矛盾

- Agent Skills 将这个设计原则应用到上下文窗口管理上，采用三层级加载架构：

  | 层级 | 内容 | 加载时机 |
  |------|------|----------|
  | **Level 1 (元数据)** | 技能名称和描述 | 启动时加载到系统提示词，代价极低 |
  | **Level 2 (核心指令)** | 完整的 `SKILL.md` 文件 | 仅当 Agent 判断该技能适用于当前任务时才加载 |
  | **Level 3+ (补充资源)** | `references/`、`scripts/`、`assets/` 等捆绑文件 | 仅当特定场景需要时按需访问 |

- 解决了什么问题？
  上下文窗口扩展问题：如果把所有技能的完整内容都加载到上下文中，会快速耗尽有限的 token 额度。
  渐进式披露的解决方案：

  - Agent 可以"知道"无限多的技能（通过轻量级的元数据）
  - 但只在需要时才"深入了解"具体技能（读取 SKILL.md）
  - 详细参考资料更是按需获取（读取 references/ 等）

- 就像 新员工入职：
  1. 先给一个公司概览（元数据）
  2. 开始工作时再给详细的岗位说明（SKILL.md）
  3. 遇到具体问题时再查阅参考手册（references/）

```markdown
将基本信息放在 SKILL.md 中，详细参考资料放在单独文件中：
# PDF 处理

## 快速开始
[基本指令]

## 额外资源
- 完整 API 详情见 [reference.md](references/reference.md)
- 使用示例见 [examples.md](references/examples.md)
```

> **重要**：保持引用层级为一层，直接从 SKILL.md 链接到参考文件，避免深层嵌套。

## 五、SKILL 与 MCP 的区别

#### 一句话区分

> **SKILL = 静态知识指令** | **MCP = 动态工具连接**

#### 详细对比

| 维度         | SKILL（技能）           | MCP（模型上下文协议）  |
| ------------ | ----------------------- | ---------------------- |
| **本质**     | Markdown 格式的指令文档 | 客户端-服务器通信协议  |
| **作用**     | 教 AI "怎么做"          | 让 AI "能做什么"       |
| **存储**     | 本地 .md 文件           | 运行中的服务进程       |
| **交互**     | 单向（AI 读取指令）     | 双向（请求-响应）      |
| **扩展能力** | 知识、流程、模板        | 外部工具、数据源、API  |
| **技术门槛** | 低（只需会写 Markdown） | 较高（需要开发服务端） |
| **实时性**   | 静态内容                | 动态获取实时数据       |

#### 通俗比喻

想象一个厨房：

|            | SKILL                                            | MCP                                   |
| ---------- | ------------------------------------------------ | ------------------------------------- |
| **比喻**   | 📜 **菜谱（工作流程手册）**                       | 🧰 **工具目录（道具清单）**            |
| **内容**   | 教你如何炒一道菜<br/>- 先放油、再放盐、炒 3 分钟 | 列出有哪些工具<br/>- 锅铲、菜刀、砧板 |
| **执行者** | 你（Agent）读菜谱，一步步做                      | 厨具独立工作，你随时取用              |
| **特点**   | 包含步骤、节奏、注意事项<br/>可以组合成"套餐"    | 每个工具独立<br/>可以自由选择         |

\> "工具的本质不是复杂，而是简单。" — OpenClaw 哲学
