import type { Metadata } from "next";

import type { CarListResponse } from "@/entities/car";
import {
  carRequestToSearchParams,
  listCarsByQueryString,
  listDistinctColors,
} from "@/entities/car/api/requests";
import { getCategoryById, listCategories } from "@/entities/category/api/requests";
import {
  buildCarsCanonicalPath,
  buildCarsSeoContent,
  carFiltersToRequest,
  parseCarFilters,
  toURLSearchParams,
  type CarFiltersState,
  type SearchParamsRecord,
} from "@/features/car-filters";
import { breadcrumbSchema, buildPageMetadata, JsonLd } from "@/shared/seo";
import { CarsPage } from "@/views/cars";

const CARS_PAGE_SIZE = 10;
/** Pages beyond this are still crawlable (follow) but excluded from the index. */
const MAX_INDEXABLE_PAGE = 1;

interface CarsRouteProps {
  searchParams: Promise<SearchParamsRecord>;
}

/**
 * Parses the current page/filters and fetches the matching cars once — via
 * `listCarsByQueryString`, whose `React.cache()` wrapper collapses this into
 * a single Prisma query even though `generateMetadata` and the page body
 * both call it independently for the same request.
 */
async function resolveCarsListing(searchParams: SearchParamsRecord): Promise<{
  filters: CarFiltersState;
  page: number;
  data: CarListResponse;
}> {
  const rawSearchParams = toURLSearchParams(searchParams);
  const filters = parseCarFilters(rawSearchParams);
  const pageParam = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const request = carFiltersToRequest(filters, { page, page_size: CARS_PAGE_SIZE });
  const queryString = carRequestToSearchParams(request).toString();
  const data = await listCarsByQueryString(queryString);

  return { filters, page, data };
}

export async function generateMetadata({ searchParams }: CarsRouteProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const { filters, page, data } = await resolveCarsListing(resolvedSearchParams);

  const category =
    filters.categoryIds.length === 1 ? await getCategoryById(filters.categoryIds[0]) : null;

  const { title, description } = buildCarsSeoContent(filters, category);
  const canonicalPath = buildCarsCanonicalPath(filters);

  // Paginated tails and dead-end (zero-result) filter combinations are junk
  // for search — keep them crawlable but out of the index.
  const noIndex = page > MAX_INDEXABLE_PAGE || data.total === 0;

  return buildPageMetadata({ title, description, path: canonicalPath, noIndex });
}

export default async function Cars({ searchParams }: CarsRouteProps) {
  const resolvedSearchParams = await searchParams;

  let initialData: CarListResponse | undefined;
  let categories: { id: number; name: string }[] = [];
  let colors: string[] = [];

  try {
    const [{ data }, categoriesResponse, colorsResponse] = await Promise.all([
      resolveCarsListing(resolvedSearchParams),
      listCategories(new URLSearchParams({ pageSize: "100" })),
      listDistinctColors(),
    ]);
    initialData = data;
    categories = categoriesResponse.items;
    colors = colorsResponse;
  } catch {
    initialData = undefined;
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Cars For Sale", path: "/cars" }])}
      />
      <CarsPage initialData={initialData} categories={categories} colors={colors} />
    </>
  );
}
