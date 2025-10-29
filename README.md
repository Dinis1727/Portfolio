# 🚀 Portfolio – Monorepo with Next.js + NestJS + Prisma + PostgreSQL

Monorepo with **Next.js (Frontend)** and **NestJS (Backend)**, managed with **pnpm workspaces** and using **Prisma ORM** with **PostgreSQL**.

---

## 🧩 Structure

```
.
├── apps/
│   ├── api/        # NestJS backend (Render)
│   └── web/        # Next.js frontend (Vercel)
├── apps/api/prisma # Prisma schema and migrations
└── package.json    # Workspace configuration
```

---

## ⚙️ Setup

### 1️⃣ Install dependencies
```bash
pnpm install
```

### 2️⃣ Generate Prisma client
```bash
pnpm -C apps/api prisma generate
```

### 3️⃣ Run in development
```bash
# Backend - NestJS
pnpm -C apps/api dev   # http://localhost:4000

# Frontend - Next.js
pnpm -C apps/web dev   # http://localhost:3000
```

---

## 🧪 CI/CD

GitHub Actions workflows automatically run:
- API: build and Prisma client generation
- Web: production build with Next.js

File locations:
```
.github/workflows/
├── ci-api.yml
└── ci-web.yml
```

---

## 🛠️ Tech Stack

- Next.js 14
- NestJS 10
- Prisma ORM
- PostgreSQL
- pnpm Workspaces
- TypeScript

---

## 📦 Deploy

- Frontend (Vercel): `apps/web`
- Backend (Render): `apps/api`

---

## 👨‍💻 Author

Built by **Dinis1727**
