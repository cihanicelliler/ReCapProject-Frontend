import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrls: ['./rent-add.component.css'],
})
export class RentAddComponent implements OnInit {
  rentals: Rental[] = [];
  dataLoaded = false;
  customerId: number;
  date: Date;
  returnDate: Date;
  date1: Date;
  carDetails: CarDetail[];
  returnDate1: Date;
  rentcarid: number;
  dailyPrice: number;
  rentable: boolean = false;
  carImageBasePath = 'https://localhost:44309/uploads/';
  carToBeRented: Rental;
  constructor(
    private rentService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private routerService: Router,
    private carDetailService: CarDetailService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rentcarid']) {
        this.getRentalsById(params['rentcarid']);
        this.rentcarid = params['rentcarid'];
        this.getCarDetailsById(params['rentcarid']);
        this.onSubmit();
      } else {
        this.getRentalDetails();
        this.onSubmit();
      }
    });
  }
  getRentalDetails() {
    this.rentService.getRentalDetails().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  getRentalsById(rentcarid: number) {
    this.rentService.getRentsById(rentcarid).subscribe((response) => {
      this.rentals = response.data;
      this.date1 = this.rentals[0].rentDate;
      this.returnDate1 = this.rentals[0].returnDate;
      this.dataLoaded = true;
    });
  }

  getCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dailyPrice = response.data[0].dailyPrice;
    });
  }
  onSubmit() {
    console.log(this.date1);
    console.log(this.returnDate1);
    if ((<any>this.date).format() < (<any>this.returnDate).format()) {
      if (
        ((<any>this.date).format() < this.date1 &&
          this.date1 < (<any>this.returnDate).format()) ||
        ((<any>this.date).format() < this.returnDate1 &&
          this.returnDate1 < (<any>this.returnDate).format()) ||
        ((<any>this.date).format() > this.date1 &&
          this.returnDate1 > (<any>this.returnDate).format())
      ) {
        this.toastrService.error(
          'Bu tarih aralığında mevcut bir rezervasyon var!'
        );
      } else {
        console.log(
          (<any>this.returnDate - <any>this.date) / (3600 * 24 * 1000)
        );
        this.carToBeRented = {
          carId: this.rentcarid,
          rentDate: (<any>this.date).format(),
          returnDate: (<any>this.returnDate).format(),
          customerId: this.customerId,
        };
        this.paymentService.setRental(
          this.carToBeRented,
          ((<any>this.returnDate - <any>this.date) / (3600 * 24 * 1000)) *
            this.dailyPrice
        );
        this.toastrService.info('Ödeme noktasına yönlendiriliyorsunuz...');
        this.rentable = true;
        this.routerService.navigate(['/cars/payment/' + this.rentcarid]);
      }
    } else {
      this.toastrService.error('Bu tarih aralığında araç kiralayamazsınız!');
    }
  }
}
