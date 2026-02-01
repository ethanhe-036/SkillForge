# OpenCode 平台安装指南

## Skill 目录位置

| 类型 | 路径 |
|------|------|
| 全局 | `~/.config/opencode/skills/<skill-name>/` |
| 项目级 | `.opencode/skills/<skill-name>/` |

## 安装方法

### 手动复制

```bash
# 复制精选 skills 到全局目录
cp -r curated/opencode/.opencode/skills/* ~/.config/opencode/skills/

# 或复制到当前项目
cp -r curated/opencode/.opencode/skills/* .opencode/skills/
```

### Windows 用户

```powershell
Copy-Item -Recurse -Force curated\opencode\.opencode\skills\* $HOME\.config\opencode\skills\
```

## 兼容性说明

OpenCode 自动读取以下目录：
- `.opencode/skills/` - 原生格式
- `.claude/skills/` - Claude 兼容格式

这意味着你也可以直接使用 Claude Code 格式的 skills！

## 官方文档

[OpenCode Skills 文档](https://opencode.ai/docs/skills)
