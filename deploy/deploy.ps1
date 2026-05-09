param(
  [string]$EnvFile = ".env"
)

if (!(Test-Path $EnvFile)) {
  Copy-Item .env.production $EnvFile
}

docker compose -f docker-compose.prod.yml --env-file $EnvFile up -d --build
docker compose -f docker-compose.prod.yml --env-file $EnvFile exec api npx prisma migrate deploy
Write-Host "Dasturxon deploy bo'ldi"
