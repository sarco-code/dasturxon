# Dasturxon SaaS

## Tez Deploy (Render + Vercel + Neon)

### 1) API (Render)
Repo ichida `render.yaml` bor. Render'da **Blueprint** yoki **New Web Service** orqali import qiling.
Agar qo'lda kiritsangiz:
- Root: `apps/api`
- Build: `npm install && npm run build`
- Start: `npm run start`

Env:
- `DATABASE_URL` = Neon URL
- `JWT_SECRET` = kuchli secret
- `PORT` = `10000`
- `CLIENT_URL` = Vercel URL

### 2) Web (Vercel)
- Root: `apps/web`
- `apps/web/vercel.json` tayyor.

Env:
- `NEXT_PUBLIC_API_URL=https://dasturxon-api-wwz8.onrender.com/api`
- `NEXT_PUBLIC_SOCKET_URL=https://dasturxon-api-wwz8.onrender.com`

### 3) Neon migrate/seed
Localda bir marta:
- `npm run prisma:generate -w apps/api`
- `npm run prisma:migrate -w apps/api -- --name prod_init`
- `npm run seed -w apps/api`

### 4) Docker (VPS fallback)
- `docker-compose.prod.yml` tayyor
- `deploy/nginx/default.conf` tayyor
- `bash deploy/deploy.sh`

## Demo Login
- Super Admin: `+998900000001 / superadmin123`
- Restoran Admin: `+998901234567 / admin12345`
