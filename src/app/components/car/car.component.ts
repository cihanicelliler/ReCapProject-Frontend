import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  arabalar: Car[] = [];
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  dataBrand = false;
  dataColor = false;
  message: string;
  filterText = '';
  isAuth:boolean=false;
  carImageBasePath = 'https://localhost:44309/uploads/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private routerService:Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
        this.isAuthenticated();
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
        this.isAuthenticated();
      } else {
        this.getAllCarsDetails();
        this.isAuthenticated();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.arabalar = response.data;
      this.dataLoaded = true;
    });
  }

  getAllCarsDetails() {
    this.carDetailService.getAllCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.message = response.message;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.arabalar = response.data;
      this.dataLoaded = true;
      this.dataBrand = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.arabalar = response.data;
      this.dataLoaded = true;
      this.dataColor = true;
    });
  }
  goToDetail(id:number){
    this.routerService.navigate(['/cars/detail/' + id]);
  }
  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
  }
}
