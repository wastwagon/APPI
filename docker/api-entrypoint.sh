#!/bin/sh
set -e

echo "▶ Running database migrations…"
cd /app/packages/database
pnpm exec prisma migrate deploy

if [ "$SEED_ADMIN_ENABLED" = "true" ]; then
  echo "▶ Running database seed…"
  pnpm exec tsx prisma/seed.ts
else
  echo "▷ Seed skipped (set SEED_ADMIN_ENABLED=true on first deploy only)"
fi

echo "▶ Starting API…"
cd /app/apps/api
exec node dist/index.js
