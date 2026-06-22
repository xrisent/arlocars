#!/bin/sh
set -e

APP_HOST="${APP_HOST:-app}"
APP_PORT="${APP_PORT:-3000}"
DOMAIN="${LETSENCRYPT_DOMAIN:-}"
EMAIL="${LETSENCRYPT_EMAIL:-}"
STAGING="${CERTBOT_STAGING:-0}"

export APP_HOST APP_PORT DOMAIN

mkdir -p /var/www/certbot /etc/letsencrypt

if [ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]; then
  curl -fsSL \
    https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    -o /etc/letsencrypt/options-ssl-nginx.conf
fi

if [ ! -f /etc/letsencrypt/ssl-dhparams.pem ]; then
  openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048
fi

render_upstream_config() {
  envsubst '${APP_HOST} ${APP_PORT}' \
    < /etc/nginx/templates/upstream.conf.template \
    > /etc/nginx/conf.d/00-upstream.conf
}

render_http_config() {
  envsubst '${APP_HOST} ${APP_PORT} ${DOMAIN}' \
    < /etc/nginx/templates/http.conf.template \
    > /etc/nginx/conf.d/default.conf
}

render_ssl_config() {
  envsubst '${APP_HOST} ${APP_PORT} ${DOMAIN}' \
    < /etc/nginx/templates/ssl.conf.template \
    > /etc/nginx/conf.d/ssl.conf
}

render_upstream_config
render_http_config
rm -f /etc/nginx/conf.d/ssl.conf

nginx -g 'daemon off;' &
NGINX_PID=$!

wait_for_nginx() {
  i=0
  while [ "$i" -lt 30 ]; do
    if curl -fsS http://127.0.0.1/ >/dev/null 2>&1; then
      return 0
    fi
    i=$((i + 1))
    sleep 1
  done
  return 1
}

wait_for_nginx || true

if [ -n "$DOMAIN" ] && [ -n "$EMAIL" ] && [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  echo "[nginx] Requesting Let's Encrypt certificate for ${DOMAIN}..."

  STAGING_FLAG=""
  if [ "$STAGING" = "1" ]; then
    STAGING_FLAG="--staging"
  fi

  certbot certonly --webroot \
    -w /var/www/certbot \
    -d "$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    $STAGING_FLAG \
    || echo "[nginx] Certificate request failed. HTTP on port 80 is still available."
fi

if [ -n "$DOMAIN" ] && [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  echo "[nginx] Enabling HTTPS for ${DOMAIN}"
  render_ssl_config
  nginx -s reload
else
  echo "[nginx] Running in HTTP-only mode (port 80). Set LETSENCRYPT_DOMAIN and LETSENCRYPT_EMAIL for SSL."
fi

(
  while true; do
    sleep 12h
    if [ -n "$DOMAIN" ] && certbot renew --quiet; then
      nginx -s reload || true
    fi
  done
) &

wait "$NGINX_PID"
