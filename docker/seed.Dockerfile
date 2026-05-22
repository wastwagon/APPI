FROM node:20-bookworm-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/database/package.json ./packages/database/
RUN pnpm install --filter @appi/database --frozen-lockfile || pnpm install --filter @appi/database

COPY packages/database ./packages/database
COPY apps/frontend/public/images ./apps/frontend/public/images
COPY apps/frontend/messages ./apps/frontend/messages

WORKDIR /app/packages/database
RUN pnpm exec prisma generate

ENV NODE_ENV=production
CMD ["sh", "-c", "if [ \"$SEED_ADMIN_ENABLED\" = \"true\" ]; then pnpm exec tsx prisma/seed.ts; else echo 'Seed skipped (set SEED_ADMIN_ENABLED=true for first deploy)'; fi"]
