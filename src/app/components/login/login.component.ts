import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ButtonStyleDirective } from '../../directives/buttonstyle.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,FormsModule,ReactiveFormsModule,ButtonStyleDirective]
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(){
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('eve.holt@reqres.in',[Validators.required,Validators.email]),
      password: new FormControl('cityslicka',Validators.required)
    });
  }

  login(): void {
    const userName = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;
    this.userService.login(userName,password).subscribe(res => {
      if(res && res.token) {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home');
      }
    });
  }
}
