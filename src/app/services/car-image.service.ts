import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44309/api/carImages/"

  constructor(private httpClient:HttpClient) { }
  getCarImageByCarId(carId: number): Observable<ListResponseModel<CarImage>>{
    let newApiUrl = this.apiUrl + "getimagesbycarid?carId=" + carId;

    return this.httpClient.get<ListResponseModel<CarImage>>(newApiUrl);
  }
  addImage(fileToUpload:File){
    const formData:FormData = new FormData();
    formData.append('imagePath',fileToUpload,fileToUpload.name)
    return this.httpClient.post(this.apiUrl+"add",formData)
  }
}