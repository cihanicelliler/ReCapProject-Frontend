import { Car } from "./car";
import { CarImage } from "./carImage";

  
export interface CarDetail{
    carId:number;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    description:string;
    imagePath:string;
}