<#
.SYNOPSIS
    SkillForge 一键安装脚本 (Windows)
.DESCRIPTION
    将 SkillForge 的 skills 安装到指定平台的全局目录
.PARAMETER Platform
    目标平台: cursor, trae, claude-code, opencode, antigravity, all
.PARAMETER Type
    安装类型: curated, synced, china, all
.EXAMPLE
    .\install.ps1 -Platform cursor -Type curated
#>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("cursor", "trae", "claude-code", "opencode", "antigravity", "all")]
    [string]$Platform,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("curated", "synced", "china", "all")]
    [string]$Type = "curated"
)

# 定义平台目录映射
$platformPaths = @{
    "cursor" = @{
        "source" = ".cursor/skills"
        "dest" = "$HOME\.cursor\skills"
    }
    "trae" = @{
        "source" = ".trae/skills"
        "dest" = "$HOME\.trae\skills"
    }
    "claude-code" = @{
        "source" = ".claude/skills"
        "dest" = "$HOME\.claude\skills"
    }
    "opencode" = @{
        "source" = ".opencode/skills"
        "dest" = "$HOME\.config\opencode\skills"
    }
    "antigravity" = @{
        "source" = ".agent/skills"
        "dest" = "$HOME\.gemini\antigravity\global_skills"
    }
}

# 获取脚本所在目录的父目录（项目根目录）
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

function Install-Skills {
    param($platform, $type)
    
    $config = $platformPaths[$platform]
    $sourcePath = Join-Path $projectRoot "$type\$platform\$($config.source)"
    $destPath = $config.dest
    
    if (-not (Test-Path $sourcePath)) {
        Write-Warning "源目录不存在: $sourcePath"
        return
    }
    
    # 创建目标目录
    if (-not (Test-Path $destPath)) {
        New-Item -ItemType Directory -Force -Path $destPath | Out-Null
        Write-Host "创建目录: $destPath" -ForegroundColor Green
    }
    
    # 复制 skills
    $skills = Get-ChildItem -Path $sourcePath -Directory
    foreach ($skill in $skills) {
        $skillDest = Join-Path $destPath $skill.Name
        Copy-Item -Recurse -Force -Path $skill.FullName -Destination $skillDest
        Write-Host "已安装: $($skill.Name)" -ForegroundColor Cyan
    }
}

# 主逻辑
Write-Host "`n🛠️ SkillForge 安装脚本`n" -ForegroundColor Yellow

$platforms = if ($Platform -eq "all") { $platformPaths.Keys } else { @($Platform) }
$types = if ($Type -eq "all") { @("curated", "synced", "china") } else { @($Type) }

foreach ($t in $types) {
    foreach ($p in $platforms) {
        Write-Host "`n安装 [$t] skills 到 [$p]..." -ForegroundColor Magenta
        Install-Skills -platform $p -type $t
    }
}

Write-Host "`n✅ 安装完成！请重启你的 IDE 以加载新 skills。`n" -ForegroundColor Green
