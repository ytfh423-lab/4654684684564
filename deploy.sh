#!/usr/bin/env bash
# 宝塔部署后执行：纯静态站，无 pnpm / VitePress
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
cd "$ROOT"

if [[ ! -f index.html ]]; then
  echo "[deploy] 错误: 未找到 index.html，当前目录: $ROOT" >&2
  exit 1
fi

# 网站根目录若配置为「本仓库下的 dist」，保留此段；若直接指向仓库根，可删掉下面到 echo 之间的整段
rm -rf "$ROOT/dist"
mkdir -p "$ROOT/dist"
shopt -s nullglob
for f in "$ROOT"/*; do
  b=$(basename "$f")
  [[ "$b" == .git || "$b" == dist ]] && continue
  cp -a "$f" "$ROOT/dist/"
done

echo "[deploy] 成功: 静态文件已在 $ROOT（可选 dist 子目录已同步）"
