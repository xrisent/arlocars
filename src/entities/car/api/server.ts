import "server-only";

import type { Prisma } from "@prisma/client";
import { cache } from "react";

import type { CarDto, CarListResponse, CarRowWithCategory } from "@/entities/car";
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
    oldPrice: row.oldPrice,
    mileage: row.mileage,
    name: row.name,
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
      OR: [{ name: { contains: q } }, { description: { contains: q } }],
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

/**
 * Same query as {@link listCars}, keyed by the raw query string instead of a
 * `URLSearchParams` instance so React's `cache()` can dedupe it — `app/cars/page.tsx`
 * calls this from both `generateMetadata` and the page body with an
 * identical query string, so the request-scoped cache turns that into a
 * single Prisma round trip instead of two.
 */
export const listCarsByQueryString = cache((queryString: string): Promise<CarListResponse> =>
  listCars(new URLSearchParams(queryString)),
);

export async function getCarById(id: number): Promise<CarDto | null> {
  const row = await prisma.car.findUnique({
    where: { id },
    include: { category: { select: { id: true, name: true } } },
  });
  return row ? toCarDto(row) : null;
}

export async function listDistinctColors(): Promise<string[]> {
  const rows = await prisma.car.findMany({
    select: { color: true },
    distinct: ["color"],
    orderBy: { color: "asc" },
  });
  return rows.map((row) => row.color);
}

export async function listAllCarIds(): Promise<{ id: number; lastModified: Date }[]> {
  const rows = await prisma.car.findMany({
    select: { id: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({ id: row.id, lastModified: row.createdAt }));
}
