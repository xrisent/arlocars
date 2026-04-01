import { prisma } from "@/shared/api/prisma";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function findFirstSuperuser() {
  return prisma.user.findFirst({ where: { isAdmin: true } });
}
