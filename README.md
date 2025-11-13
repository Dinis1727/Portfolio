
# Portfolio Monorepo

This project is a monorepo with a backend (NestJS + Prisma) and a frontend (Next.js + Tailwind CSS) for a personal portfolio.

## Project Structure

- `apps/api`: Backend (NestJS, Prisma)
- `apps/web`: Frontend (Next.js, Tailwind CSS)
- `infra/`: Deployment, CI/CD, Docker, and configuration files
- `prisma/`: Centralized Prisma schema and migrations

## Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Docker (optional, for running a local database)

## Installation

1. Install dependencies:

```sh
pnpm install
```

2. Configure environment variables:

Copy the `.env.example` files to `.env` in both `apps/api` and `apps/web` and adjust as needed.

```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

## Running Server

1. Run migrations and seed the database

```sh
pnpm prisma migrate dev --schema=prisma/schema.prisma
pnpm prisma db seed --schema=prisma/schema.prisma      # optional
```

## Running the Backend (API)

1. Go to the backend folder:

```sh
cd apps/api
```

2. Run backend:

```sh
pnpm dev
```

### For a production build:

```sh
pnpm --filter api build
```

The API will be available at `http://localhost:3001` (or the configured port).

## Running the Frontend (Web)

1. Go to the frontend folder:

```sh
cd apps/web
```

2. Start the development server:

```sh
pnpm dev
```

The site will be available at `http://localhost:3000`.

### For a production build:

```sh
pnpm --filter web build
pnpm --filter web start
```

## Features

- Create, list, and delete projects (API and web interface)
- Contact registration
- Database integration via Prisma
- Deploy with Docker, Vercel, Render, Neon, etc

## Other tips

- Use `pnpm prisma studio --schema=prisma/schema.prisma` to run prisma studio(visual DB UI) from the root.
- Use `pnpm lint` to lint all apps.
- Use `pnpm format` to format code with Prettier.
- The `docker-compose.yml` can be used to spin up local services (e.g. PostgreSQL).

---

Contributions and suggestions are welcome!
