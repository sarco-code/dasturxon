#!/usr/bin/env bash
set -e

cp -n .env.production .env || true

docker compose -f docker-compose.prod.yml --env-file .env up -d --build

docker compose -f docker-compose.prod.yml --env-file .env exec api npx prisma migrate deploy

echo "Dasturxon deploy bo'ldi. URL: http://SERVER_IP"
