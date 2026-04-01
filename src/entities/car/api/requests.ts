import type { Prisma } from "@prisma/client";

import type { CarDto, CarListResponse, CarRowWithCategory } from "@/entities/car/model/interfaces";
import { prisma } from "@/shared/api/prisma";
import {
  parseFloatParam,
  parseIntIdList,
  parseIntParam,
  parsePagination,
  parseStringList,
} from "@/shared/lib/list-query";

function parsePhotosJson(s: string): string[] {
  try {
    const arr = JSON.parse(s) as unknown;
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export function toCarDto(row: CarRowWithCategory): CarDto {
  return {
    id: row.id,
    price: row.price,
    description: row.description,
    mainPhoto: row.mainPhoto,
    photos: parsePhotosJson(row.photos),
    year: row.year,
    color: row.color,
    categoryId: row.categoryId,
    category: row.category,
    createdAt: row.createdAt.toISOString(),
  };
}

function buildWhere(searchParams: URLSearchParams): Prisma.CarWhereInput {
  const priceMin = parseFloatParam(searchParams.get("priceMin"));
  const priceMax = parseFloatParam(searchParams.get("priceMax"));
  const yearMin = parseIntParam(searchParams.get("yearMin"));
  const yearMax = parseIntParam(searchParams.get("yearMax"));
  const colors = parseStringList(searchParams, "colors");
  const categoryIds = parseIntIdList(searchParams, "categoryIds");
  const q = searchParams.get("q")?.trim();

  const parts: Prisma.CarWhereInput[] = [];
  if (priceMin != null) parts.push({ price: { gte: priceMin } });
  if (priceMax != null) parts.push({ price: { lte: priceMax } });
  if (yearMin != null) parts.push({ year: { gte: yearMin } });
  if (yearMax != null) parts.push({ year: { lte: yearMax } });
  if (colors.length > 0) parts.push({ color: { in: colors } });
  if (categoryIds.length > 0) parts.push({ categoryId: { in: categoryIds } });
  if (q) {
    parts.push({
      description: { contains: q },
    });
  }

  if (parts.length === 0) return {};
  return { AND: parts };
}

export async function listCars(searchParams: URLSearchParams): Promise<CarListResponse> {
  const { page, pageSize, skip } = parsePagination(searchParams);
  const where = buildWhere(searchParams);

  const [total, rows] = await prisma.$transaction([
    prisma.car.count({ where }),
    prisma.car.findMany({
      where,
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return {
    items: rows.map(toCarDto),
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getCarById(id: number): Promise<CarDto | null> {
  const row = await prisma.car.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true } } },
  });
  return row ? toCarDto(row) : null;
}
