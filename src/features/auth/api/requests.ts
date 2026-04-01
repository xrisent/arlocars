import { findFirstSuperuser, getUserByEmail, getUserById } from "@/entities/user";
import type { AuthTokens } from "@/features/auth/model/interfaces";
import { prisma } from "@/shared/api/prisma";
import { HttpError } from "@/shared/lib/http";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/shared/lib/jwt-tokens";
import { hashPassword, verifyPassword } from "@/shared/lib/password";

function readAdminCredentials(): { login: string; password: string } {
  const login = process.env.ADMIN_LOGIN?.replace(/^['"]|['"]$/g, "");
  const password = process.env.ADMIN_PASSWORD?.replace(/^['"]|['"]$/g, "");
  if (!login || !password) {
    throw new HttpError(500, "ADMIN_LOGIN and ADMIN_PASSWORD must be set in environment");
  }
  return { login, password };
}

export async function bootstrapSuperuserOnce(): Promise<{ created: boolean; message: string }> {
  const existing = await findFirstSuperuser();
  if (existing) {
    throw new HttpError(409, "Superuser already exists");
  }

  const { login, password } = readAdminCredentials();
  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      email: login,
      password: hashed,
      isAdmin: true,
    },
  });

  return { created: true, message: "Superuser created" };
}

export async function loginUser(params: { login: string; password: string }): Promise<AuthTokens> {
  const user = await getUserByEmail(params.login);

  if (!user || !user.isAdmin) {
    throw new HttpError(401, "Invalid credentials");
  }

  const ok = await verifyPassword(params.password, user.password);
  if (!ok) {
    throw new HttpError(401, "Invalid credentials");
  }

  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken({ sub: user.id, isAdmin: user.isAdmin }),
    signRefreshToken(user.id),
  ]);

  return { accessToken, refreshToken };
}

export async function refreshSession(refreshToken: string): Promise<AuthTokens> {
  let userId: number;
  try {
    userId = await verifyRefreshToken(refreshToken);
  } catch {
    throw new HttpError(401, "Invalid refresh token");
  }

  const user = await getUserById(userId);
  if (!user || !user.isAdmin) {
    throw new HttpError(401, "Invalid refresh token");
  }

  const [accessToken, newRefresh] = await Promise.all([
    signAccessToken({ sub: user.id, isAdmin: user.isAdmin }),
    signRefreshToken(user.id),
  ]);

  return { accessToken, refreshToken: newRefresh };
}
