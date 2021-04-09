import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private subject = new Subject<any>();
  email: any;
  apiUrl = 'https://localhost:44309/api/users/';
  constructor(private httpClient: HttpClient) {}

  getUser(email: any): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'getbyemail?email=' + email
    );
  }
}
