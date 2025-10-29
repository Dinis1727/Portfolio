# Portfolio – Next.js + NestJS + PostgreSQL


Monorepo com **Next.js (Vercel)** e **NestJS (Render)**, usando **Prisma** e **PostgreSQL**.


## Começar
```bash
pnpm i
pnpm -C apps/api prisma generate
pnpm -C apps/api dev # http://localhost:4000
pnpm -C apps/web dev # http://localhost:3000