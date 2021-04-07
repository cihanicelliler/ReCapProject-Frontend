import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  cars: Car[];
  brandId: number;
  carId: number;
  descriptionCarText: string;
  dailyPriceText: string;
  modelYearText: string;
  idText: string;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarById(params['id']);
        this.carId = params['id'];
        console.log(params['id']);
      }
    });
    this.getColors();
    this.getBrands();
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      descriptionCar: ['', Validators.required],
    });
  }

  getCarById(id: number) {
    this.carService.getCarsById(id).subscribe((response) => {
      this.cars = response.data;
      console.log(response.data);
      console.log(this.cars);
    });
  }

  update() {
    if (this.carId.toString() != this.idText) {
      this.toastrService.error('Id numarasını değiştiremezsiniz.', 'HATA');
    } else {
      if (this.carUpdateForm.valid) {
        let carModel = Object.assign({}, this.carUpdateForm.value);
        this.carService.update(carModel).subscribe((response) => {
          console.log(response);
          this.toastrService.success('Ürün güncellendi', 'Başarılı');
        });
      } else {
        this.toastrService.error('Formunuz eksik', 'Dikkat');
      }
    }
  }

  delete() {
    this.idText = '';
    this.modelYearText = '';
    this.dailyPriceText = '';
    this.descriptionCarText = '';
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
