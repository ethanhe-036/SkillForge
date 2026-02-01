# SkillForge 🛠️

> 跨平台 AI Agent Skills 精选集 - 开箱即用

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 什么是 SkillForge？

SkillForge 是一个汇集各平台 AI Agent Skills 的精选集合，让你下载后直接复制使用，无需逐个寻找。

**支持的平台：**
- 🖥️ Cursor
- 🚀 TRAE
- 🤖 Claude Code
- 📝 OpenCode
- 🌌 Antigravity

## 快速开始

### 方式 1：手动复制（推荐）

1. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SkillForge.git
   cd SkillForge
   ```

2. **选择你的平台，复制 skills**

   | 平台 | 复制命令 |
   |------|----------|
   | Cursor | `cp -r curated/cursor/.cursor/skills/* ~/.cursor/skills/` |
   | TRAE | `cp -r curated/trae/.trae/skills/* ~/.trae/skills/` |
   | Claude Code | `cp -r curated/claude-code/.claude/skills/* ~/.claude/skills/` |
   | OpenCode | `cp -r curated/opencode/.opencode/skills/* ~/.config/opencode/skills/` |
   | Antigravity | `cp -r curated/antigravity/.agent/skills/* ~/.gemini/antigravity/global_skills/` |

3. **重启你的 IDE，完成！**

### 方式 2：一键安装脚本

**Windows (PowerShell):**
```powershell
.\scripts\install.ps1 -Platform cursor -Type curated
```

**Mac/Linux:**
```bash
./scripts/install.sh --platform cursor --type curated
```

**参数说明：**
- `-Platform`: `cursor` / `trae` / `claude-code` / `opencode` / `antigravity` / `all`
- `-Type`: `curated`（精选）/ `synced`（同步）/ `china`（国内）/ `all`

## 目录结构

```
SkillForge/
├── curated/      # 🌟 精选精品（约 20 个，手动维护）
├── synced/       # 🔄 skills.sh 热门同步（Top 50）
├── china/        # 🇨🇳 国内特色（微信、腾讯云等）
├── personal/     # 🔒 个人专属（部分公开）
├── docs/         # 📚 文档
└── scripts/      # 🔧 工具脚本
```

## 精选 Skills 清单

### 开发流程类
| Skill | 说明 |
|-------|------|
| brainstorming | 头脑风暴，需求设计 |
| writing-plans | 编写实施计划 |
| executing-plans | 执行计划 |
| test-driven-development | TDD 工作流 |
| systematic-debugging | 系统化调试 |
| verification-before-completion | 完成前验证 |
| requesting-code-review | 请求代码审查 |
| skill-creator | 创建新 skill |

### 前端/UI 类
| Skill | 说明 |
|-------|------|
| vercel-react-best-practices | React/Next.js 最佳实践 |
| web-design-guidelines | 100+ UX 规则 |
| frontend-design | 前端设计最佳实践 |
| ui-ux-pro-max | UI/UX 设计智能 |
| remotion-best-practices | React 视频创作 |
| find-skills | 搜索发现 skills |

### 文档/工具类
| Skill | 说明 |
|-------|------|
| pdf | PDF 操作 |
| docx | Word 文档处理 |
| xlsx | Excel 处理 |
| pptx | PPT 处理 |
| mcp-builder | MCP 服务器生成 |
| supabase-postgres-best-practices | Postgres 最佳实践 |

## 文档

- [快速开始](docs/quick-start.md)
- [完整 Skill 清单](docs/skill-catalog.md)
- [贡献指南](docs/contributing.md)
- 平台指南：[Cursor](docs/platforms/cursor.md) | [TRAE](docs/platforms/trae.md) | [Claude Code](docs/platforms/claude-code.md) | [OpenCode](docs/platforms/opencode.md) | [Antigravity](docs/platforms/antigravity.md)

## 参考资源

- [skills.sh](https://skills.sh/) - Agent Skills 排行榜
- [agentskills.io](https://agentskills.io/) - Agent Skills 开放标准
- [anthropics/skills](https://github.com/anthropics/skills) - Anthropic 官方 Skills
- [obra/superpowers](https://github.com/obra/superpowers) - Superpowers 开发工作流

## License

MIT License - 详见 [LICENSE](LICENSE)
