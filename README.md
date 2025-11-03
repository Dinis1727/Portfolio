
# Portfolio Monorepo

This project is a monorepo with a backend (NestJS + Prisma) and a frontend (Next.js + Tailwind CSS) for a personal portfolio.

## Project Structure

- `apps/api`: Backend (NestJS, Prisma)
- `apps/web`: Frontend (Next.js, Tailwind CSS)
- `infra/`: Infrastructure files (deploy, Docker, etc)

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

## Running the Backend (API)

1. Go to the backend folder:

```sh
cd apps/api
```

2. Run database migrations:

```sh
pnpm prisma migrate dev
```

3. Start the server:

```sh
pnpm start:dev
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

## Tests

### Backend

In the `apps/api` folder:

```sh
pnpm test
```

### Frontend

In the `apps/web` folder (if tests are configured):

```sh
pnpm test
```

## Features

- Create, list, and delete projects (API and web interface)
- Contact registration
- Database integration via Prisma
- Deploy with Docker, Vercel, Render, etc

## Other tips

- Use `pnpm prisma studio` in `apps/api` to manage the database with a visual interface.
- The `docker-compose.yml` file can be used to start auxiliary services (e.g., local database).

---

Contributions and suggestions are welcome!
