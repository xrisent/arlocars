import Image from "next/image";
import Link from "next/link";

import type { CarDto } from "@/entities/car";
import { formatMileage, formatPrice } from "@/shared/lib/format";
import { CustomButton } from "@/shared/ui";
import { getImageUrl } from "@/shared/utils";

import "./car-detail-page.scss";

interface CarDetailPageProps {
  car: CarDto;
}

export function CarDetailPage({ car }: CarDetailPageProps) {
  const imageAlt = `${car.name} — ${car.year} used car for sale in Dubai`;
  const hasOldPrice = car.oldPrice != null && car.oldPrice > car.price;

  return (
    <main className="CarDetailPage">
      <div className="container CarDetailPage-inner">
        <nav className="CarDetailPage-breadcrumb" aria-label="Breadcrumb">
          <Link href="/cars">Cars For Sale</Link>
          <span aria-hidden="true"> / </span>
          <span>{car.name}</span>
        </nav>

        <div className="CarDetailPage-grid">
          <div className="CarDetailPage-gallery">
            <Image
              src={getImageUrl(car.mainPhoto)}
              alt={imageAlt}
              width={1080}
              height={720}
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className="CarDetailPage-mainImage"
            />
            {car.photos.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {car.photos.map((photo) => (
                  <Image
                    key={getImageUrl(photo)}
                    src={getImageUrl(photo)}
                    alt=""
                    width={160}
                    height={80}
                    className="rounded-[8px] object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <article className="CarDetailPage-info">
            <h1 className="CarDetailPage-title">{car.name}</h1>
            <div className="CarDetailPage-priceRow">
              <p className="CarDetailPage-price">{formatPrice(car.price)}</p>
              {hasOldPrice && (
                <span className="CarDetailPage-oldPrice">
                  {formatPrice(car.oldPrice as number)}
                </span>
              )}
            </div>
            <ul className="CarDetailPage-meta">
              <li>
                <strong>Year:</strong> {car.year}
              </li>
              <li>
                <strong>Color:</strong> {car.color}
              </li>
              <li>
                <strong>Category:</strong> {car.category.name}
              </li>
              {car.mileage != null && (
                <li>
                  <strong>Mileage:</strong> {formatMileage(car.mileage)}
                </li>
              )}
            </ul>
            <div className="CarDetailPage-description">
              <h2>Description</h2>
              <p>{car.description}</p>
            </div>
            <Link href="/contact">
              <CustomButton>Enquire About This Car</CustomButton>
            </Link>
          </article>
        </div>
      </div>
    </main>
  );
}
