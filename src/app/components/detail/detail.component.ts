import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  findexPointUser: number;
  findexPointCar: number;
  isRentable:boolean;
  isAuth:boolean=false;
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private userService: UserService,
    private authService:AuthService
  ) {}
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  carImageBasePath = 'https://localhost:44309/uploads/';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailByCarId(params['id']);
        this.getUserPoint();
        this.isAuthenticated();
      }
    });
  }

  getCarDetailByCarId(id: number) {
    this.carDetailService.getCarDetailByCarId(id).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
      this.findexPointCar = response.data[0].findexPoint;
    });
  }

  getCarDetails() {
    this.carDetailService.getAllCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getUserPoint() {
    var email = localStorage.getItem('email');
    this.userService.getUser(email).subscribe((response)=>{
      this.findexPointUser=response.data.findexPoint;
      console.log(this.findexPointUser)
    })
  }

  addToCart(carDetail: CarDetail) {
    this.toastrService.info(
      'Kiralama sayfasına yönlendiriliyor...',
      carDetail.brandName
    );
  }
  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
  }
}
