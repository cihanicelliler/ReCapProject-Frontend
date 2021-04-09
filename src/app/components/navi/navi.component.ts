import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userName: string;
  userSurname: string;
  email: string;
  isAuth: boolean = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
    this.getEmail();
  }
  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.isAuth = true;
    }
  }
  getEmail() {
    var email = localStorage.getItem('email');
    this.userService.getUser(email?.toString()).subscribe((response) => {
      this.userName = response.data.firstName;
      this.userSurname = response.data.lastName;
    });
  }
  logOut() {
    this.toastrService.info('Çıkış Yapıldı');
    localStorage.setItem('token', '');
    localStorage.setItem('email', '');
    window.location.href="http://localhost:4200/login";
  }
}
