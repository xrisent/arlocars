import { Prisma } from "@prisma/client";

import { getCategoryById } from "@/entities/category";
import type { CategoryDto } from "@/entities/category/model/interfaces";
import { prisma } from "@/shared/api/prisma";
import { HttpError } from "@/shared/lib/http";

export async function createCategory(name: string): Promise<CategoryDto> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new HttpError(400, "Name is required");
  }
  try {
    const row = await prisma.category.create({ data: { name: trimmed } });
    return { id: row.id, name: row.name };
  } catch {
    throw new HttpError(409, "Category with this name already exists");
  }
}

export async function updateCategory(id: number, name: string): Promise<CategoryDto> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new HttpError(400, "Name is required");
  }
  const existing = await getCategoryById(id);
  if (!existing) {
    throw new HttpError(404, "Category not found");
  }
  try {
    const row = await prisma.category.update({
      where: { id },
      data: { name: trimmed },
    });
    return { id: row.id, name: row.name };
  } catch {
    throw new HttpError(409, "Category with this name already exists");
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    await prisma.category.delete({ where: { id } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new HttpError(404, "Category not found");
      }
      if (e.code === "P2003" || e.code === "P2014") {
        throw new HttpError(409, "Cannot delete category that has cars");
      }
    }
    throw e;
  }
}
