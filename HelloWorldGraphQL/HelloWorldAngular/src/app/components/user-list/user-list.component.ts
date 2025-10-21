import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: any;

  // Form fields
  firstName = '';
  lastName = '';
  email = '';
  
  // Edit mode
  editMode = false;
  editingUserId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (result) => {
        this.users = result.data.users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.editMode && this.editingUserId) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    this.userService.addUser(this.firstName, this.lastName, this.email).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

  editUser(user: User): void {
    this.editMode = true;
    this.editingUserId = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }

  updateUser(): void {
    if (this.editingUserId) {
      this.userService.updateUser(this.editingUserId, this.firstName, this.lastName, this.email).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          // Users will refresh automatically due to refetchQueries
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.editMode = false;
    this.editingUserId = null;
  }
}