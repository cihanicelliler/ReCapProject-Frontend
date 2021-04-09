import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  userName:string;
  userSurname:string;
  
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe((response)=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        window.location.href="http://localhost:4200";
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
  setEmail(){
    localStorage.setItem("email",this.loginForm.value['email']);
  }
  
}
