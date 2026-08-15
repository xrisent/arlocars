import Image from "next/image";
import Link from "next/link";

import { CarDto } from "@/entities/car";
import { getImageUrl } from "@/shared/utils";

import "./car-card.scss";

interface ICarCardViewProps {
  car: CarDto;
}

export const CarCardView = ({ car }: ICarCardViewProps) => {
  return (
    <div className="CarCard flex flex-col gap-[15px]">
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
        <div className="flex justify-between items-center">
          <Link href={`/cars/${car.id}`}>{car.name}</Link>
        </div>
        <p>{car.price} AED</p>
      </div>
    </div>
  );
};
