# Antigravity 平台安装指南

## Skill 目录位置

| 类型 | 路径 |
|------|------|
| 全局 | `~/.gemini/antigravity/global_skills/<skill-name>/` |
| 项目级 | `.agent/skills/<skill-name>/` |

## 安装方法

### 手动复制

```bash
# 复制精选 skills 到全局目录
cp -r curated/antigravity/.agent/skills/* ~/.gemini/antigravity/global_skills/

# 或复制到当前项目
cp -r curated/antigravity/.agent/skills/* .agent/skills/
```

### Windows 用户

```powershell
# 全局安装
Copy-Item -Recurse -Force curated\antigravity\.agent\skills\* $HOME\.gemini\antigravity\global_skills\

# 项目级安装
Copy-Item -Recurse -Force curated\antigravity\.agent\skills\* .agent\skills\
```

## 验证安装

Skills 使用渐进式发现模式：
1. 发现：Agent 首先看到 skill 名称和描述
2. 激活：如果相关，加载完整 SKILL.md 内容
3. 执行：按照指令执行

## 官方文档

[Antigravity Skills 文档](https://antigravity.google/docs/skills)
