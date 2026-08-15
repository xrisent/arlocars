# Docker deployment

Stack: **Next.js app** + **MySQL** + **nginx** (ports **80/443**) + **Let's Encrypt**.

Accessible on the server by IP on port **80** immediately. HTTPS on port **443** is enabled automatically when the domain DNS points to the server.

## Requirements

- Docker and Docker Compose v2 on the server
- Ports **80** and **443** open in the firewall
- Domain `A` record → server IP (required only for SSL)

## Quick start

```bash
cp .env.example .env
# Edit .env — DATABASE_URL (for Hostinger), secrets, ADMIN_*, LETSENCRYPT_*, NEXT_PUBLIC_SITE_URL

docker compose up -d --build
```

Open in browser:

- `http://<server-ip>` — works right away
- `https://your-domain` — after DNS propagates and the certificate is issued

## Hostinger (Business plan)

On shared hosting, create a MySQL database in hPanel and set in `.env`:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
```

Then apply migrations before or after first deploy:

```bash
npx prisma migrate deploy
npx prisma generate
```

## First admin user

After the app is running, create the superuser once:

```bash
curl -X POST http://<server-ip>/api/auth/bootstrap
# or via domain:
curl -X POST https://your-domain/api/auth/bootstrap
```

Uses `ADMIN_LOGIN` and `ADMIN_PASSWORD` from `.env`.

## Environment variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string (`mysql://USER:PASSWORD@HOST:3306/DB`) |
| `NEXT_PUBLIC_SITE_URL` | Public URL (`https://domain`) — **baked in at build time**, rebuild after change |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Long random strings |
| `ADMIN_LOGIN` / `ADMIN_PASSWORD` | Initial admin credentials |
| `LETSENCRYPT_DOMAIN` | Domain for SSL certificate |
| `LETSENCRYPT_EMAIL` | Email for Let's Encrypt |
| `CERTBOT_STAGING=1` | Test certificates without rate limits |

## Useful commands

```bash
docker compose logs -f          # all services
docker compose logs -f app      # app only
docker compose restart nginx    # reload after manual cert changes
docker compose down             # stop
docker compose up -d --build    # rebuild after code changes
```

## Data persistence

| Volume | Contents |
|--------|----------|
| `mysql_data` | MySQL database files |
| `uploads_data` | Uploaded car images |
| `certbot_conf` | SSL certificates |
| `certbot_www` | ACME challenge files |

## SSL notes

- Let's Encrypt **does not issue certificates for bare IP addresses** — a domain is required for HTTPS.
- Until DNS is configured, the site works over **HTTP on port 80** (including by IP).
- After DNS points to the server, restart nginx: `docker compose restart nginx` — or redeploy: `docker compose up -d --build`.

## Rebuild after domain change

`NEXT_PUBLIC_SITE_URL` is embedded during `docker compose build`. After changing it:

```bash
docker compose up -d --build
```
