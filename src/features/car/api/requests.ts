import { randomUUID } from "node:crypto";

import { getCarById, toCarDto } from "@/entities/car";
import type { CarDto } from "@/entities/car/model/interfaces";
import type { ParsedCarCreate, ParsedCarUpdate } from "@/features/car/model/interfaces";
import { prisma } from "@/shared/api/prisma";
import {
  appendCarPhotos,
  getUploadIdFromMainPhoto,
  removeUploadDir,
  replaceMainPhoto,
  saveNewCarImages,
} from "@/shared/lib/car-upload";
import { HttpError } from "@/shared/lib/http";

function parsePhotosJson(s: string): string[] {
  try {
    const arr = JSON.parse(s) as unknown;
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export async function createCar(data: ParsedCarCreate): Promise<CarDto> {
  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) {
    throw new HttpError(400, "Category not found");
  }

  const uploadId = randomUUID();
  const { mainPhoto, photos } = await saveNewCarImages({
    uploadId,
    mainPhoto: data.mainPhoto,
    photos: data.photos,
  });

  const row = await prisma.car.create({
    data: {
      price: data.price,
      year: data.year,
      color: data.color,
      description: data.description,
      categoryId: data.categoryId,
      mainPhoto,
      photos: JSON.stringify(photos),
    },
    include: { category: { select: { id: true, name: true } } },
  });

  return toCarDto(row);
}

export async function updateCar(id: number, data: ParsedCarUpdate): Promise<CarDto> {
  const existing = await prisma.car.findUnique({ where: { id } });
  if (!existing) {
    throw new HttpError(404, "Car not found");
  }

  if (data.categoryId != null) {
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
    if (!category) {
      throw new HttpError(400, "Category not found");
    }
  }

  let mainPhoto = existing.mainPhoto;
  let photosJson = existing.photos;

  const uploadId = getUploadIdFromMainPhoto(existing.mainPhoto) ?? randomUUID();

  if (data.mainPhoto) {
    mainPhoto = await replaceMainPhoto({ uploadId, mainPhoto: data.mainPhoto });
  }

  let currentPhotos = parsePhotosJson(photosJson);

  if (data.replacePhotos) {
    currentPhotos = [];
  }

  if (data.photos.length > 0) {
    const startIndex = currentPhotos.length;
    const newPaths = await appendCarPhotos({
      uploadId,
      startIndex,
      photos: data.photos,
    });
    currentPhotos = [...currentPhotos, ...newPaths];
    photosJson = JSON.stringify(currentPhotos);
  } else if (data.replacePhotos) {
    photosJson = JSON.stringify(currentPhotos);
  }

  const row = await prisma.car.update({
    where: { id },
    data: {
      ...(data.price != null ? { price: data.price } : {}),
      ...(data.year != null ? { year: data.year } : {}),
      ...(data.color != null ? { color: data.color } : {}),
      ...(data.description != null ? { description: data.description } : {}),
      ...(data.categoryId != null ? { categoryId: data.categoryId } : {}),
      mainPhoto,
      photos: photosJson,
    },
    include: { category: { select: { id: true, name: true } } },
  });

  return toCarDto(row);
}

export async function deleteCar(id: number): Promise<void> {
  const existing = await getCarById(id);
  if (!existing) {
    throw new HttpError(404, "Car not found");
  }

  const uploadId = getUploadIdFromMainPhoto(existing.mainPhoto);
  if (uploadId) {
    await removeUploadDir(uploadId);
  }

  await prisma.car.delete({ where: { id } });
}
