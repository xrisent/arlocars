import Image from "next/image";
import Link from "next/link";

import { CarDto } from "@/entities/car";
import { formatMileage, formatPrice } from "@/shared/lib/format";
import { getImageUrl } from "@/shared/utils";

import "./car-card.scss";

interface ICarCardViewProps {
  car: CarDto;
}

export const CarCardView = ({ car }: ICarCardViewProps) => {
  const hasOldPrice = car.oldPrice != null && car.oldPrice > car.price;

  return (
    <Link href={`/cars/${car.id}`} className="CarCard flex flex-col gap-[15px]">
      <div className="CarCard__image-wrapper">
        <Image
          width={280}
          height={180}
          src={getImageUrl(car.mainPhoto)}
          alt={`${car.name} — ${car.year} used car for sale in Dubai`}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-[15px]">
        <div className="flex justify-between items-end">
          <span>{car.name}</span>
          <span className="CarCard__year">{car.year}</span>
        </div>
        <div className="CarCard__price-row">
          <div className="CarCard__price">
            <p>{formatPrice(car.price)}</p>
            {hasOldPrice && (
              <span className="CarCard__old-price">{formatPrice(car.oldPrice as number)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
