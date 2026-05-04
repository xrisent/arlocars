import { HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

import { CarDto } from "@/entities/car";

import "./car-card.scss";

interface ICarCardViewProps {
  car: CarDto;
}

export const CarCardView = ({ car }: ICarCardViewProps) => {
  return (
    <div className="CarCard flex flex-col gap-[15px]">
      <div className="CarCard__image-wrapper">
        <Image width={280} height={180} src={car.mainPhoto} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-[15px]">
        <div className="flex justify-between items-center">
          <Link href={`/cars/${car.id}`}>{car.name}</Link>
          <button className="flex justify-center items-center border p-[8px]">
            <HeartOutlined color="" />
          </button>
        </div>
        <p>{car.price} AED</p>
      </div>
    </div>
  );
};
