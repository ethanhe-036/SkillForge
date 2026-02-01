# Cursor 平台安装指南

## Skill 目录位置

| 类型 | 路径 |
|------|------|
| 全局 | `~/.cursor/skills/<skill-name>/` |
| 项目级 | `.cursor/skills/<skill-name>/` |

## 安装方法

### 手动复制（推荐）

```bash
# 复制精选 skills 到全局目录
cp -r curated/cursor/.cursor/skills/* ~/.cursor/skills/

# 或复制到当前项目
cp -r curated/cursor/.cursor/skills/* .cursor/skills/
```

### Windows 用户

```powershell
# 复制到全局目录
Copy-Item -Recurse -Force curated\cursor\.cursor\skills\* $HOME\.cursor\skills\
```

## 验证安装

1. 重启 Cursor
2. 打开 Settings → Rules
3. 在 "Agent Decides" 部分应该看到安装的 skills

## 兼容性说明

Cursor 自动读取以下目录的 skills：
- `.cursor/skills/` - 原生格式
- `.claude/skills/` - Claude 兼容格式
- `.codex/skills/` - Codex 兼容格式

## 官方文档

[Cursor Skills 文档](https://cursor.com/docs/context/skills)
