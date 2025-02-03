// src/app/components/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatError


  ],

})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.userForm.reset();
      });
    }
  }
}
