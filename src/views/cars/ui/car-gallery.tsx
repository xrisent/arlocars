"use client";

import { Image as AntImage } from "antd";
import NextImage from "next/image";
import { useState } from "react";

import { getImageUrl } from "@/shared/utils";

interface CarGalleryProps {
  mainPhoto: string;
  photos: string[];
  alt: string;
}

export function CarGallery({ mainPhoto, photos, alt }: CarGalleryProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const photoUrls = [mainPhoto, ...photos].map(getImageUrl);

  const openAt = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  return (
    <AntImage.PreviewGroup
      items={photoUrls}
      preview={{
        current,
        open,
        onOpenChange: setOpen,
        onChange: setCurrent,
      }}
    >
      <button
        type="button"
        className="CarDetailPage-mainImageButton"
        onClick={() => openAt(0)}
        aria-label={`View larger photo of ${alt}`}
      >
        <NextImage
          src={photoUrls[0]}
          alt={alt}
          width={1080}
          height={720}
          preload
          sizes="(max-width: 900px) 100vw, 55vw"
          className="CarDetailPage-mainImage"
        />
      </button>

      {photos.length > 0 && (
        <div className="CarDetailPage-thumbs">
          {photos.map((photo, index) => (
            <button
              key={getImageUrl(photo)}
              type="button"
              className="CarDetailPage-thumbButton"
              onClick={() => openAt(index + 1)}
              aria-label={`View larger photo ${index + 2} of ${alt}`}
            >
              <NextImage
                src={getImageUrl(photo)}
                alt=""
                width={160}
                height={80}
                className="CarDetailPage-thumbImage"
              />
            </button>
          ))}
        </div>
      )}
    </AntImage.PreviewGroup>
  );
}
