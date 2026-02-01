#!/bin/bash
#
# SkillForge 一键安装脚本 (Mac/Linux)
#
# Usage:
#   ./install.sh --platform cursor --type curated
#   ./install.sh -p all -t all
#

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# 默认值
PLATFORM=""
TYPE="curated"

# 解析参数
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -t|--type)
            TYPE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 --platform <platform> [--type <type>]"
            echo ""
            echo "Platforms: cursor, trae, claude-code, opencode, antigravity, all"
            echo "Types: curated, synced, china, all (default: curated)"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

if [ -z "$PLATFORM" ]; then
    echo -e "${RED}错误: 请指定 --platform 参数${NC}"
    exit 1
fi

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 平台配置
declare -A PLATFORM_SOURCE
declare -A PLATFORM_DEST

PLATFORM_SOURCE["cursor"]=".cursor/skills"
PLATFORM_DEST["cursor"]="$HOME/.cursor/skills"

PLATFORM_SOURCE["trae"]=".trae/skills"
PLATFORM_DEST["trae"]="$HOME/.trae/skills"

PLATFORM_SOURCE["claude-code"]=".claude/skills"
PLATFORM_DEST["claude-code"]="$HOME/.claude/skills"

PLATFORM_SOURCE["opencode"]=".opencode/skills"
PLATFORM_DEST["opencode"]="$HOME/.config/opencode/skills"

PLATFORM_SOURCE["antigravity"]=".agent/skills"
PLATFORM_DEST["antigravity"]="$HOME/.gemini/antigravity/global_skills"

install_skills() {
    local platform=$1
    local type=$2
    
    local source_rel="${PLATFORM_SOURCE[$platform]}"
    local dest="${PLATFORM_DEST[$platform]}"
    local source="$PROJECT_ROOT/$type/$platform/$source_rel"
    
    if [ ! -d "$source" ]; then
        echo -e "${YELLOW}跳过: $source 不存在${NC}"
        return
    fi
    
    # 创建目标目录
    mkdir -p "$dest"
    echo -e "${GREEN}目标目录: $dest${NC}"
    
    # 复制 skills
    for skill_dir in "$source"/*/; do
        if [ -d "$skill_dir" ]; then
            skill_name=$(basename "$skill_dir")
            if [ "$skill_name" != "*" ]; then
                cp -r "$skill_dir" "$dest/"
                echo -e "${CYAN}已安装: $skill_name${NC}"
            fi
        fi
    done
}

# 主逻辑
echo -e "\n${YELLOW}🛠️ SkillForge 安装脚本${NC}\n"

# 处理 all 选项
if [ "$PLATFORM" = "all" ]; then
    platforms=("cursor" "trae" "claude-code" "opencode" "antigravity")
else
    platforms=("$PLATFORM")
fi

if [ "$TYPE" = "all" ]; then
    types=("curated" "synced" "china")
else
    types=("$TYPE")
fi

# 执行安装
for t in "${types[@]}"; do
    for p in "${platforms[@]}"; do
        echo -e "\n${MAGENTA}安装 [$t] skills 到 [$p]...${NC}"
        install_skills "$p" "$t"
    done
done

echo -e "\n${GREEN}✅ 安装完成！请重启你的 IDE 以加载新 skills。${NC}\n"
