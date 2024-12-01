import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardStyleDirective } from '../../directives/cardstyle.directive';
import { ButtonStyleDirective } from '../../directives/buttonstyle.directive';
import { emailAsyncValidator } from '../../validators/async-email.validator';
import { UserInfo } from '../../intefaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,CardStyleDirective,ButtonStyleDirective,RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  users: UserInfo[] = [];
  editForm: FormGroup;
  currentUserId: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      emailId: ['', [Validators.required,Validators.email], emailAsyncValidator()]
    });
  }

  ngOnInit(): void {
    this.loadUsersFromLocalStorage();
  }

  loadUsersFromLocalStorage(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  onEdit(userId: number): void {
    this.currentUserId = userId;
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.editForm.setValue({
        username: user.userName,
        emailId: user.emailId
      });
    }
  }

  cancel(): void {
    this.currentUserId = null;
  }

  onSave(): void {
    if (this.editForm.valid && this.currentUserId !== null) {
      const updatedUser = this.editForm.value;
      const userIndex = this.users.findIndex(u => u.id === this.currentUserId);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
        this.saveUsersToLocalStorage();
        alert('User updated successfully!');
        this.currentUserId = null;
      }
    }
  }

  onDelete(userId: number): void {
    this.users = this.users.filter(u => u.id !== userId);
    this.saveUsersToLocalStorage();
    alert('User deleted successfully!');
  }

  getPaginatedUsers(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.users.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage * this.itemsPerPage >= this.users.length;
  }
}
