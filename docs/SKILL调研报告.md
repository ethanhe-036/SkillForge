# SKILL 技术调研报告

> **作者：** Aether
> **日期：** 2026-02-01
> **目标受众：** 程序员、开发者、AI 工具使用者

---

## 一、SKILL 是什么？

### 1.1 定义

**SKILL** 是一种**AI Agent 的技能扩展机制**，采用 **AgentSkills** 标准。

简单来说：**SKILL 就是一份"工作流程手册"，教 AI 如何完成特定任务。**

### 1.2 核心价值

- ✅ **封装复杂流程** → 把多步操作变成单条指令
- ✅ **积累领域知识** → 团队经验可复用
- ✅ **自动化重复工作** → 避免手动重复劳动
- ✅ **降低认知负担** → 无需记忆复杂命令

### 1.3 适用场景

- 部署流程自动化
- 代码审查流水线
- 数据迁移任务
- 监控告警处理
- 通知消息发送

---

## 二、SKILL 的格式规范

### 2.1 SKILL.md 必需结构

```yaml
---
name: skill-name
description: 技能简短描述
---

# 使用说明

详细的步骤、注意事项、示例等
```

### 2.2 Frontmatter 关键字段

| 字段 | 必需 | 说明 |
|--------|--------|--------|
| `name` | ✅ | 技能唯一标识符 |
| `description` | ✅ | 在系统提示中显示的描述 |
| `metadata` | ❌ | 可选元数据（见下方） |

### 2.3 Metadata 字段说明

```yaml
metadata:
  {
    "openclaw":
    {
      "emoji": "🚀",           # 图标
      "requires": {
        "bins": ["node"],    # 必需的工具
        "env": ["API_KEY"],   # 必需的环境变量
        "config": ["browser.enabled"]  # 必需的配置项
      },
      "install": [...]           # 安装方式
    }
  }
```

### 2.4 典型目录结构

```
my-skill/
├── SKILL.md              # ✅ 必需：核心文档
├── script.js             # ❌ 可选：辅助脚本
├── package.json          # ❌ 可选：Node 依赖
└── assets/              # ❌ 可选：资源文件
```

**核心文件作用：**
- `SKILL.md` → Agent 读取的"剧本"，描述了完整的任务流程
- 其他文件 → SKILL 可能调用的脚本、模板、资源

---

## 三、MCP vs SKILL 对比

### 3.1 通俗比喻

想象一个厨房：

| | SKILL | MCP |
|---|---|---|
| **比喻** | 📜 **菜谱（工作流程手册）** | 🧰 **工具目录（道具清单）** |
| **内容** | 教你如何炒一道菜<br/>- 先放油、再放盐、炒 3 分钟 | 列出有哪些工具<br/>- 锅铲、菜刀、砧板 |
| **执行者** | 你（Agent）读菜谱，一步步做 | 厨具独立工作，你随时取用 |
| **特点** | 包含步骤、节奏、注意事项<br/>可以组合成"套餐" | 每个工具独立<br/>可以自由选择 |

### 3.2 本质差异

| 维度 | SKILL | MCP |
|--------|---------|-----|
| **定位** | 工作流指导 | 工具定义 |
| **输出给谁** | AI Agent | AI 模型 |
| **执行主体** | Agent（经过思考后执行） | 模型（直接调用） |
| **侧重点** | 流程编排、知识沉淀 | 工具标准化 |
| **灵活性** | 高（可组合、可分支） | 中（标准协议） |

### 3.3 何时用哪个？

| 场景 | 推荐方案 |
|--------|-----------|
| 需要完整工作流 | **SKILL** |
| 跨平台通用工具 | **MCP** |
| 团队经验沉淀 | **SKILL** |
| 外部服务标准集成 | **MCP** |
| 复杂决策逻辑 | **SKILL** |
| 简单工具定义 | **MCP** |

---

## 四、程序员如何通过 SKILL 提效

### 4.1 实际场景

#### 场景 1：代码审查自动化

**传统方式：**
```
用户：帮我审查这个文件
Agent：读文件 → 调模型分析 → 输出建议
耗时：5 分钟
```

**使用 SKILL：**
```yaml
---
name: code-review
description: 一键代码审查（linting + 安全检查）
metadata:
  openclaw:
    requires:
      bins: ["eslint", "safety"]
---

执行：
1. eslint 检查代码风格
2. safety 扫描依赖漏洞
3. 汇总报告
```
```
耗时：30 秒
提效：10x
```

#### 场景 2：Git 发布流程

**传统方式：**
```
用户：发布新版本
Agent：git add → git commit → git push → 创建 release → 通知
耗时：15 分钟
```

**使用 SKILL：**
```yaml
---
name: git-release
description: 一键完成 Git 发布
metadata:
  openclaw:
    command-dispatch: tool
    command-tool: git-release
---
```
```
耗时：1 分钟
提效：15x
```

### 4.2 提效数据总结

| 任务类型 | 传统方式 | SKILL 方式 | 提升比例 |
|----------|-----------|------------|-----------|
| 代码审查 | 5-10 分钟 | 30 秒 | **10-20x** |
| 部署流程 | 15-30 分钟 | 1 分钟 | **15-30x** |
| 日志分析 | 20-40 分钟 | 2 分钟 | **10-20x** |
| 数据迁移 | 30-60 分钟 | 5 分钟 | **6-12x** |

### 4.3 最佳实践

✅ **推荐做法：**
- 命名用 kebab-case（如 `git-workflow`）
- 依赖明确声明（`requires.bins`）
- 提供错误处理指南
- 包含测试示例

❌ **避免做法：**
- 命名太通用（如 `code`、`deploy`）
- 硬编码敏感信息
- 缺少使用说明

---

## 五、SKILL 生态系统

### 5.1 AgentSkills 规范

SKILL 遵循 **AgentSkills** 标准，这意味着：
- 跨工具兼容性（OpenClaw、Pi 等）
- 统一的 Frontmatter 格式
- 元数据驱动加载

### 5.2 技能发现与安装

```bash
# 搜索技能
npx clawhub search 代码审查

# 安装
npx clawhub install code-reviewer

# 更新所有
openclaw skills update --all
```

### 5.3 社区与贡献

- 🌐 **ClawHub** - 技能市场：https://clawhub.com
- 💻 **GitHub** - 开源技能库
- 📝 **文档** - 最佳实践分享

---

## 六、快速开始

### 6.1 创建第一个 SKILL

```bash
# 1. 创建目录
mkdir -p ~/workspace/skills/hello-world

# 2. 创建 SKILL.md
cat > ~/workspace/skills/hello-world/SKILL.md << 'EOF'
---
name: hello-world
description: 向用户问好
---

# Hello World

当用户说"你好"时，此技能会被触发。
EOF

# 3. 查看状态
openclaw skills info hello-world
```

### 6.2 从模板创建

使用内置的 `skill-creator`：

```bash
openclaw agent "使用 skill-creator 创建一个名为 my-skill 的技能，功能是..."
```

---

## 七、常见问题

### Q1: SKILL 和 Plugin 的区别？

**A:**
- **SKILL** → 教 Agent 怎么做事（被动文档）
- **Plugin** → 注册新工具、命令（主动扩展）

### Q2: 我的 SKILL 没加载？

**A:** 检查：
1. SKILL.md 是否在根目录？
2. 依赖是否满足（`openclaw skills check`）？
3. 是否被禁用（`openclaw.json`）？

### Q3: 可以组合多个 SKILL 吗？

**A:** 可以！Agent 可以自由组合多个技能完成复杂任务。

---

## 八、资源与链接

- 📚 [AgentSkills 规范](https://agentskills.io)
- 🛠️ [ClawHub 市场](https://clawhub.com)
- 📖 [OpenClaw 文档](https://docs.openclaw.ai/tools/skills)

---

## 九、总结

**SKILL 的核心价值：**

1. 📝 **经验沉淀** → 一次编写，无限复用
2. 🚀 **效率提升** → 节省 10-30x 时间
3. 🤝 **团队协作** → 统一工作标准
4. 🔌 **生态集成** → 轻松接入外部服务
5. 🧠 **降低负担** → 无需记忆复杂流程

**下一步行动：**

✅ 使用 `skill-creator` 创建第一个 SKILL
✅ 测试依赖检查和安装流程
✅ 发布到 ClawHub 与社区分享

---

> "工具的本质不是复杂，而是简单。" — OpenClaw 哲学
