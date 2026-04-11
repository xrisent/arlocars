import { atom } from "jotai";

import { CarDto } from "@/entities/car";

export const carsAtom = atom<CarDto[]>([]);
