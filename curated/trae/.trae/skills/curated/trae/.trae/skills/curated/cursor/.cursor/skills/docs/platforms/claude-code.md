# Claude Code 平台安装指南

## Skill 目录位置

| 类型 | 路径 |
|------|------|
| 个人（全局） | `~/.claude/skills/<skill-name>/` |
| 项目级 | `.claude/skills/<skill-name>/` |

## 安装方法

### 手动复制

```bash
# 复制精选 skills 到个人目录
cp -r curated/claude-code/.claude/skills/* ~/.claude/skills/

# 或复制到当前项目
cp -r curated/claude-code/.claude/skills/* .claude/skills/
```

### Windows 用户

```powershell
Copy-Item -Recurse -Force curated\claude-code\.claude\skills\* $HOME\.claude\skills\
```

## 验证安装

1. 在 Claude Code 中运行 `claude skills list`
2. 或输入 `/` 查看可用的 skills

## 优先级说明

当 skill 同名时，优先级：
1. 项目级 `.claude/skills/` - 最高
2. 个人级 `~/.claude/skills/`
3. 插件级 - 最低

## 官方文档

[Claude Code Skills 文档](https://docs.anthropic.com/en/docs/claude-code/skills)
