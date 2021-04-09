import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value['password'] === this.registerForm.value['password2'] ) {
        let registerModel = Object.assign({}, this.registerForm.value);
        this.authService.register(registerModel).subscribe(
          (response) => {
            this.toastrService.info(response.message);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email',this.registerForm.value['email']);
            window.location.href = 'http://localhost:4200';
          },
          (responseError) => {
            this.toastrService.error(responseError.error);
          }
        );
      } else {
        this.toastrService.error("Parolalar uyuşmuyor")
      }
    }
  }
}
