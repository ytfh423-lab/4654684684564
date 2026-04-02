#!/usr/bin/env bash
# =============================================================================
# 宝塔 / Webhook 部署后钩子 — 本仓库为 Hexo generate 后的纯静态站
# 不要使用 pnpm / npm run build / VitePress（无 .vitepress/dist）
# 拉取 main 后若站点根目录就是本仓库目录，通常无需任何构建命令。
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

if [[ ! -f index.html ]]; then
  echo "[deploy.sh] 错误: 当前目录缺少 index.html，请确认 Web 根目录指向仓库根目录。" >&2
  exit 1
fi

echo "[deploy.sh] 静态文件就绪: $ROOT"
echo "[deploy.sh] 无需 pnpm / vitepress。若仍看到旧脚本报错，请在宝塔网站设置里改掉「部署脚本」。"
exit 0
