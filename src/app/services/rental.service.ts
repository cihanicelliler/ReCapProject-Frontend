import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44309/api/rental/getrentdetails"
  constructor(private httpClient:HttpClient) { }

  getRents():Observable<RentalResponseModel>{
    return this.httpClient
    .get<RentalResponseModel>(this.apiUrl);
  }
}
