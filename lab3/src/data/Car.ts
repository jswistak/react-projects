import carsFromJSON from "./cars.json"
import {Key} from "react";

export interface Car {
    id: Key;
    name: string;
    pricePerDay: number;
    seats: number;
    doors: number;
    image: string;
    AC: boolean;
}

export const CARS: Car[] = carsFromJSON;