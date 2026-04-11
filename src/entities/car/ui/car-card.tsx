import Image from "next/image";

import { CarDto } from "@/entities/car";

interface ICarCardViewProps {
  car: CarDto;
}

export const CarCardView = ({ car }: ICarCardViewProps) => {
  return (
    <div className="flex flex-col">
      <Image width={300} height={200} src={car.mainPhoto} alt="" />
      <div className="flex flex-col">
        <div className="flex">
          <h3>{car.name}</h3>
          <button></button>
        </div>
        <p>{car.price}</p>
      </div>
    </div>
  );
};
