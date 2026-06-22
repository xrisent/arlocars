import type { Prisma } from "@prisma/client";
import axios from "axios";

import type {
  CategoryDto,
  CategoryListResponse,
  ICategoryRequest,
} from "@/entities/category/model/interfaces";
import { prisma } from "@/shared/api/prisma";
import { API_ENDPOINTS } from "@/shared/constants";
import { parsePagination } from "@/shared/lib/list-query";

function buildWhere(search: string | undefined): Prisma.CategoryWhereInput {
  if (!search?.trim()) return {};
  return {
    name: { contains: search.trim() },
  };
}

export async function listCategories(searchParams: URLSearchParams): Promise<CategoryListResponse> {
  const { page, pageSize, skip } = parsePagination(searchParams);
  const search = searchParams.get("search")?.trim() || searchParams.get("q")?.trim();
  const where = buildWhere(search);

  const [total, rows] = await prisma.$transaction([
    prisma.category.count({ where }),
    prisma.category.findMany({
      where,
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    }),
  ]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);

  return {
    items: rows.map((r) => ({ id: r.id, name: r.name })),
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getCategoryById(id: number): Promise<CategoryDto | null> {
  const row = await prisma.category.findUnique({ where: { id } });
  return row ? { id: row.id, name: row.name } : null;
}

export function categoryRequestToSearchParams(params: ICategoryRequest): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.page != null) searchParams.set("page", String(params.page));
  if (params.pageSize != null) searchParams.set("pageSize", String(params.pageSize));
  if (params.search) searchParams.set("search", params.search);

  return searchParams;
}

export async function fetchCategories(params: ICategoryRequest = {}): Promise<CategoryListResponse> {
  const response = await axios.get<CategoryListResponse>(API_ENDPOINTS.CATEGORIES.BASE, {
    params,
  });
  return response.data;
}
