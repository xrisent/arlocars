import Image from "next/image";
import Link from "next/link";

import type { CarDto } from "@/entities/car";
import { CustomButton } from "@/shared/ui";

import "./car-detail-page.scss";

type CarDetailPageProps = {
  car: CarDto;
};

export function CarDetailPage({ car }: CarDetailPageProps) {
  const imageAlt = `${car.name} — ${car.year} used car for sale in Dubai`;

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
              src={car.mainPhoto}
              alt={imageAlt}
              width={1080}
              height={720}
              priority
              sizes="(max-width: 900px) 100vw, 55vw"
              className="CarDetailPage-mainImage"
            />
          </div>

          <article className="CarDetailPage-info">
            <h1 className="CarDetailPage-title">{car.name}</h1>
            <p className="CarDetailPage-price">{car.price.toLocaleString()} AED</p>
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
