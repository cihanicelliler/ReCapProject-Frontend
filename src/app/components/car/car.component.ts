import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car1: any = {
    Id: 1,
    BrandId: 1,
    ColorId: 1,
    ModelYear: 2005,
    DailyPrice: 100,
    DescriptionCar: 'Güzel',
  };
  car2: any = {
    Id: 2,
    BrandId: 1,
    ColorId: 1,
    ModelYear: 2005,
    DailyPrice: 100,
    DescriptionCar: 'Güzel',
  };
  car3: any = {
    Id: 3,
    BrandId: 1,
    ColorId: 1,
    ModelYear: 2005,
    DailyPrice: 100,
    DescriptionCar: 'Güzel',
  };
  car4: any = {
    Id: 4,
    BrandId: 1,
    ColorId: 1,
    ModelYear: 2005,
    DailyPrice: 100,
    DescriptionCar: 'Güzel',
  };
  car5: any = {
    Id: 5,
    BrandId: 1,
    ColorId: 1,
    ModelYear: 2005,
    DailyPrice: 100,
    DescriptionCar: 'Güzel',
  };
  cars = [this.car1, this.car2, this.car3, this.car4, this.car5];
  
  constructor() { }

  ngOnInit(): void {
  }

}
