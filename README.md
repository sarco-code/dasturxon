# Dasturxon SaaS

Dasturxon - O'zbekiston restoranlari uchun production-level SaaS restaurant management platform.

## Roles
- SUPER_ADMIN
- RESTAURANT_ADMIN
- OFITSIANT
- OSHPAZ
- KASSIR

## Local Run
1. `npm install`
2. `cp apps/api/.env.example apps/api/.env`
3. `cp apps/web/.env.example apps/web/.env.local`
4. `npm run prisma:generate -w apps/api`
5. `npm run prisma:migrate -w apps/api -- --name init_saas`
6. `npm run seed -w apps/api`
7. `npm run dev`

Demo login:
- Super Admin: `+998900000001 / superadmin123`
- Restoran Admin: `+998901234567 / admin12345`

## Production Deploy (VPS + Docker)
1. VPSga Docker o'rnating:
   - `sudo apt update`
   - `sudo apt install -y docker.io docker-compose-plugin`
2. Loyihani serverga yuklang (`git clone` yoki zip).
3. Rootda env tayyorlang:
   - `cp .env.production .env`
   - `.env` ichida `SERVER_IP` va parollarni almashtiring.
4. Deploy:
   - Linux: `bash deploy/deploy.sh`
   - Windows PowerShell: `./deploy/deploy.ps1`
5. Tekshiruv:
   - `docker compose -f docker-compose.prod.yml --env-file .env ps`
   - `http://SERVER_IP`

## Update / Redeploy
- `git pull`
- `docker compose -f docker-compose.prod.yml --env-file .env up -d --build`
- `docker compose -f docker-compose.prod.yml --env-file .env exec api npx prisma migrate deploy`

## Production Files
- `docker-compose.prod.yml`
- `deploy/nginx/default.conf`
- `.env.production`
- `deploy/deploy.sh`
- `deploy/deploy.ps1`
