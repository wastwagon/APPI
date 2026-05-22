#!/bin/bash
# Start APPI frontend on port 3010 (use from Terminal: bash scripts/start-frontend.sh)
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if lsof -ti :3010 >/dev/null 2>&1; then
  echo "Stopping process on port 3010..."
  lsof -ti :3010 | xargs kill -9 2>/dev/null || true
  sleep 1
fi

echo "Starting APPI frontend..."
echo "  Open: http://127.0.0.1:3010/en"
echo "  (If localhost fails in Chrome, use 127.0.0.1 — IPv6 [::1] may not be bound)"
echo ""

exec pnpm dev:web
