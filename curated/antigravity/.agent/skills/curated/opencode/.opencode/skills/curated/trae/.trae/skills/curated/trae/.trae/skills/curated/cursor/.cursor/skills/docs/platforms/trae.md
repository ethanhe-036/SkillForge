# TRAE 平台安装指南

## Skill 目录位置

| 类型 | 路径 |
|------|------|
| 全局 | `~/.trae/skills/<skill-name>/` |
| 项目级 | `.trae/skills/<skill-name>/` |

## 安装方法

### 手动复制

```bash
# 复制精选 skills 到全局目录
cp -r curated/trae/.trae/skills/* ~/.trae/skills/

# 或复制到当前项目
cp -r curated/trae/.trae/skills/* .trae/skills/
```

### Windows 用户

```powershell
Copy-Item -Recurse -Force curated\trae\.trae\skills\* $HOME\.trae\skills\
```

## 验证安装

1. 重启 TRAE
2. 在对话中输入 `/` 查看可用的 skills
3. 或直接描述任务，TRAE 会自动调用相关 skill

## 官方文档

[TRAE Skills 最佳实践](https://www.trae.ai/blog/trae_tutorial_0115)
