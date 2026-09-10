import type { MetadataRoute } from "next";

import { listAllCarIds } from "@/entities/car/api/requests";
import { listCategories } from "@/entities/category/api/requests";
import { siteConfig } from "@/shared/config/site";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] =
  [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/cars", priority: 0.9, changeFrequency: "daily" },
    { path: "/sell-your-car", priority: 0.8, changeFrequency: "weekly" },
    { path: "/finance", priority: 0.8, changeFrequency: "monthly" },
    { path: "/automotive-solutions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let carEntries: MetadataRoute.Sitemap = [];

  try {
    const cars = await listAllCarIds();
    carEntries = cars.map((car) => ({
      url: `${siteConfig.url}/cars/${car.id}`,
      lastModified: car.lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  } catch {
    carEntries = [];
  }

  // Predefined popular filter combinations: one indexable landing page per
  // category (e.g. `/cars?categories=3`), so the most useful filtered views
  // get discovered and indexed directly instead of relying on internal
  // links alone.
  let categoryFilterEntries: MetadataRoute.Sitemap = [];

  try {
    const { items: categories } = await listCategories(new URLSearchParams({ pageSize: "100" }));
    categoryFilterEntries = categories.map((category) => ({
      url: `${siteConfig.url}/cars?categories=${category.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    }));
  } catch {
    categoryFilterEntries = [];
  }

  return [...staticEntries, ...carEntries, ...categoryFilterEntries];
}
