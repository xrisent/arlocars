function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

export function getJwtAccessSecret(): Uint8Array {
  return new TextEncoder().encode(requireEnv("JWT_ACCESS_SECRET"));
}

export function getJwtRefreshSecret(): Uint8Array {
  return new TextEncoder().encode(requireEnv("JWT_REFRESH_SECRET"));
}
