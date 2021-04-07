import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { max } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  carId: string;
  descriptionCarText: string;
  dailyPriceText: string;
  modelYearText: string;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      descriptionCar: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign(
        {},
        this.carAddForm.value
      );
      this.carService.add(carModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success('Ürün eklendi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  delete(){
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
