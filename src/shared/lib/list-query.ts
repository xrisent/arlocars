export function parseIntParam(value: string | null): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function parseFloatParam(value: string | null): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : undefined;
}

export function parseStringList(searchParams: URLSearchParams, key: string): string[] {
  const all = searchParams.getAll(key);
  if (all.length > 1) {
    return all.flatMap((s) =>
      s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    );
  }
  const single = searchParams.get(key);
  if (!single) return [];
  return single
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseIntIdList(searchParams: URLSearchParams, key: string): number[] {
  const raw = parseStringList(searchParams, key);
  const nums = raw.map((s) => Number.parseInt(s, 10)).filter((n) => Number.isFinite(n));
  return [...new Set(nums)];
}

export function parsePagination(searchParams: URLSearchParams, maxPageSize = 50) {
  const page = Math.max(1, parseIntParam(searchParams.get("page")) ?? 1);
  const rawSize = parseIntParam(searchParams.get("pageSize")) ?? 10;
  const pageSize = Math.min(maxPageSize, Math.max(1, rawSize));
  return { page, pageSize, skip: (page - 1) * pageSize };
}
