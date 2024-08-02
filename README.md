# Todo REST API

## Tech stack

- NestJS
- PostgreSQL
- Prisma
- JWT
- Passport

## Run locally

### Prerequisites

- Node >= v20.16
- PNPM
- Docker

### Instructions

**Run the following command**

```
docker compose up -d
```

**Create database via local [adminer](http://localhost:8080)**

Default credentials:

```text
System: PostgreSQL
Server: postgres:5432
Username: postgres
Password: postgres
```

**Create .env file**

Example:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo-v1?schema=public

ORIGIN=http://localhost:5173

PORT=5000

PASSWORD_SALT=8
TOKEN_SALT=2

JWT_ALGORITHM=HS512
JWT_ACCESS_SECRET=jwt-access-secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=jwt-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_NAME=todo-v1_jwt_refresh_token
COOKIE_MAX_AGE=604800000

SERVE_STATIC_FOLDER=static
SERVE_STATIC_PREFIX=/static

CHECKPOINT_DISABLE=1
```

**Install dependencies**

```
pnpm install
```

**Migrate Prisma schema to database**

```
pnpm prisma migrate dev
```

**Run**

```
pnpm start
```
