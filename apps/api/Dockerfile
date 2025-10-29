FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ../.. ./ 
COPY apps/api/package.json ./apps/api/
RUN corepack enable && pnpm i --filter api --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && pnpm -C apps/api prisma generate && pnpm -C apps/api build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/node_modules ./node_modules
COPY apps/api/prisma ./prisma
CMD ["node", "dist/main.js"] 