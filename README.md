
# Portfolio Monorepo

Personal portfolio monorepo with a NestJS + Prisma backend and a Next.js + Tailwind CSS frontend, using pnpm workspaces.

## Structure

- `apps/api`: NestJS API (Prisma + PostgreSQL)
- `apps/web`: Next.js frontend (App Router, Tailwind)
- `prisma/`: centralized schema and migrations
- `infra/`: Docker/CI/CD and deployment configs

## Requirements

- Node.js 18+
- pnpm
- PostgreSQL locally or via Docker (`docker compose up -d postgres`)
- (Optional) `sharp` to optimize images in production (`pnpm --filter web add sharp`)

## Setup

1) Install dependencies
```sh
pnpm install
```

2) Environment variables  
Copy the examples and adjust URLs/ports:
```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```
`DATABASE_URL` must point to Postgres and `NEXT_PUBLIC_API_URL` to the API (default `http://localhost:4000`).

3) Database  
```sh
pnpm prisma migrate dev --schema=prisma/schema.prisma
pnpm prisma db seed --schema=prisma/schema.prisma   # optional
```

## Development

- API: `pnpm --filter api dev` (runs at `http://localhost:4000`)
- Web: `pnpm --filter web dev` (uses `NEXT_PUBLIC_API_URL` to fetch `/projects`)
- Run everything via workspaces: `pnpm dev`

## Build and local production

- API:  
  ```sh
  pnpm --filter api build
  pnpm --filter api start   # listens on http://localhost:4000
  ```

- Web:  
  ```sh
  pnpm --filter web build
  pnpm --filter web start   # listens on http://localhost:3000
  ```

Note: Next.js recommends installing `sharp` for production image optimization.

## Main API endpoints

- `GET /projects` — list projects
- `POST /projects` — create project
- `POST /contact` — register contact

## Useful scripts

- `pnpm lint` — lint all apps
- `pnpm format` — format with Prettier
- `pnpm prisma:deploy` — `prisma migrate deploy` (production)
- `pnpm prisma:seed` — run seed (`prisma/seed.ts`)
- `pnpm prisma studio --schema=prisma/schema.prisma` — DB UI

Contributions and suggestions are welcome!
