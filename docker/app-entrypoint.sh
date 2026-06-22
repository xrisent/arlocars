#!/bin/sh
set -e

mkdir -p /data /app/public/uploads

echo "[app] Applying database migrations..."
./node_modules/.bin/prisma migrate deploy

echo "[app] Starting Next.js on ${HOSTNAME}:${PORT}..."
exec node server.js
