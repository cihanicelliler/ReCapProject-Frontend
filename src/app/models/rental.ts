export interface Rental{
    id?:number;
    carId:number;
    customerId:number;
    paymentId?:number;
    rentDate:Date;
    returnDate:Date;
}