import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardStyleDirective } from '../../directives/cardstyle.directive';
import { ButtonStyleDirective } from '../../directives/buttonstyle.directive';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule,RouterModule,CardStyleDirective,ButtonStyleDirective],
})
export class UsersComponent implements OnInit {
  users$!: Observable<any>;
  currentPage: number = 1;
  totalPages: number = 2;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.users$ = this.userService.getUsers(page);
  }

  nextPage(): void {
    this.loadUsers(++this.currentPage);
  }

  prevPage(): void {
    this.loadUsers(--this.currentPage);
  }
}
