import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44309/api/rental/"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<Rental>>{
    let newApiUrl = this.apiUrl+"getrentdetails";
    return this.httpClient
    .get<ListResponseModel<Rental>>(newApiUrl);
  }
  getRents():Observable<ListResponseModel<Rental>>{
    let newApiUrl = this.apiUrl+"getall";
    return this.httpClient
    .get<ListResponseModel<Rental>>(newApiUrl);
  }

  getRentsById(rentcarid:number):Observable<ListResponseModel<Rental>>{
    let newApiUrl = this.apiUrl+"getrentbyid?rentcarid="+rentcarid;
    return this.httpClient
    .get<ListResponseModel<Rental>>(newApiUrl);
  }

  addRent(rent: Rental): Observable<ResponseModel>{
    let newPath= this.apiUrl +'addrent';
    return this.httpClient.post<ResponseModel>(newPath,rent);
  }
}
