import { randomUUID } from "node:crypto";
import { mkdir, readdir, rm, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { HttpError } from "@/shared/lib/http";
import { absUploadFilePath } from "@/shared/lib/public-path";

function uniqueId(): string {
  return randomUUID().slice(0, 8);
}

function uploadDirAbs(uploadId: string): string {
  return absUploadFilePath(`cars/${uploadId}`);
}

async function removeFilesMatching(dirAbs: string, predicate: (name: string) => boolean): Promise<void> {
  let entries: string[];
  try {
    entries = await readdir(dirAbs);
  } catch {
    return;
  }

  await Promise.all(
    entries
      .filter(predicate)
      .map((name) => unlink(path.join(dirAbs, name)).catch(() => undefined)),
  );
}

async function removeGalleryFiles(dirAbs: string): Promise<void> {
  await removeFilesMatching(dirAbs, (name) => name.startsWith("photo-"));
}

async function removeMainFiles(dirAbs: string): Promise<void> {
  await removeFilesMatching(dirAbs, (name) => name.startsWith("main"));
}

export async function removeGalleryPhotos(uploadId: string): Promise<void> {
  await removeGalleryFiles(uploadDirAbs(uploadId));
}

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function extFromFile(file: File): string {
  const byMime = MIME_TO_EXT[file.type];
  if (byMime) return byMime;
  const name = file.name;
  const dot = name.lastIndexOf(".");
  if (dot >= 0) {
    return name.slice(dot + 1).toLowerCase() || "bin";
  }
  return "bin";
}

function assertImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new HttpError(400, `Invalid file type for image: ${file.type || "unknown"}`);
  }
}

export async function saveNewCarImages(params: {
  uploadId: string;
  mainPhoto: File;
  photos: File[];
}): Promise<{ mainPhoto: string; photos: string[] }> {
  assertImage(params.mainPhoto);
  for (const p of params.photos) {
    assertImage(p);
  }

  const baseRel = `/uploads/cars/${params.uploadId}`;
  const dirAbs = absUploadFilePath(`${baseRel.slice(1)}`);
  await mkdir(dirAbs, { recursive: true });

  const mainExt = extFromFile(params.mainPhoto);
  const mainName = `main-${uniqueId()}.${mainExt}`;
  const mainAbs = path.join(dirAbs, mainName);
  const mainBuf = Buffer.from(await params.mainPhoto.arrayBuffer());
  await writeFile(mainAbs, mainBuf);
  const mainPhoto = `${baseRel}/${mainName}`;

  const photoPaths: string[] = [];
  for (let i = 0; i < params.photos.length; i++) {
    const file = params.photos[i];
    const ext = extFromFile(file);
    const fname = `photo-${i}-${uniqueId()}.${ext}`;
    const abs = path.join(dirAbs, fname);
    await writeFile(abs, Buffer.from(await file.arrayBuffer()));
    photoPaths.push(`${baseRel}/${fname}`);
  }

  return { mainPhoto, photos: photoPaths };
}

export async function appendCarPhotos(params: {
  uploadId: string;
  startIndex: number;
  photos: File[];
}): Promise<string[]> {
  const baseRel = `/uploads/cars/${params.uploadId}`;
  const dirAbs = absUploadFilePath(`${baseRel.slice(1)}`);
  await mkdir(dirAbs, { recursive: true });

  const out: string[] = [];
  for (let i = 0; i < params.photos.length; i++) {
    const file = params.photos[i];
    assertImage(file);
    const ext = extFromFile(file);
    const fname = `photo-${params.startIndex + i}-${uniqueId()}.${ext}`;
    const abs = path.join(dirAbs, fname);
    await writeFile(abs, Buffer.from(await file.arrayBuffer()));
    out.push(`${baseRel}/${fname}`);
  }
  return out;
}

export async function replaceMainPhoto(params: { uploadId: string; mainPhoto: File }): Promise<string> {
  assertImage(params.mainPhoto);
  const baseRel = `/uploads/cars/${params.uploadId}`;
  const dirAbs = absUploadFilePath(`${baseRel.slice(1)}`);
  await mkdir(dirAbs, { recursive: true });
  await removeMainFiles(dirAbs);
  const ext = extFromFile(params.mainPhoto);
  const mainName = `main-${uniqueId()}.${ext}`;
  const mainAbs = path.join(dirAbs, mainName);
  await writeFile(mainAbs, Buffer.from(await params.mainPhoto.arrayBuffer()));
  return `${baseRel}/${mainName}`;
}

export function getUploadIdFromMainPhoto(mainPhotoPath: string): string | null {
  const m = mainPhotoPath.match(/^\/uploads\/cars\/([^/]+)\//);
  return m?.[1] ?? null;
}

export async function removeUploadDir(uploadId: string): Promise<void> {
  const abs = absUploadFilePath(`cars/${uploadId}`);
  await rm(abs, { recursive: true, force: true });
}
