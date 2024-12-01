import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { emailAsyncValidator } from '../../validators/async-email.validator';
import { ButtonStyleDirective } from '../../directives/buttonstyle.directive';
import { UserInfo } from '../../intefaces';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,ButtonStyleDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  registerForm!: FormGroup;
  userId:number = 1;
  constructor () {}

  ngOnInit() {
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl('',Validators.required),
      emailId: new FormControl('',[Validators.required,Validators.email],emailAsyncValidator()),
      password: new FormControl('',Validators.required)
    });
  }

  registerUser() {
    const user:UserInfo = {
      id: this.getIdForNewUser(),
      userName: this.registerForm.controls['userName'].value,
      emailId: this.registerForm.controls['emailId'].value,
      password: this.registerForm.controls['password'].value,
    }
    this.saveUserInLocalStorage(user);
    alert('User Created Successfully');
  }

  saveUserInLocalStorage(user:UserInfo) {
    const storedUsers = localStorage.getItem('users');
    let users:Array<UserInfo> = [];
    if(storedUsers) {
      users = JSON.parse(storedUsers);
      users.push(user);
    } else {
      users.push(user);
    }
    localStorage.setItem('users',JSON.stringify(users));
  }

  getIdForNewUser(): number {
    let id:number = 1;
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const latestUserIndex = users.lastIndexOf(users[users.length - 1]);
      if (latestUserIndex !== -1) {
        const latestUser = users[latestUserIndex];
        id = ++latestUser.id;
      }
    }
    return id;
  }
}
