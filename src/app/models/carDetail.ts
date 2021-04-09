import { Car } from "./car";
import { CarImage } from "./carImage";

  
export interface CarDetail{
    carId:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    imagePath:string;
    findexPoint:number;
}