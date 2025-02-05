import { Component } from '@angular/core';
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    RouterLink,
    MatInput,
    NgIf,
    MatError,
    MatLabel
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  //mockado
  private mockUser = {
    email: 'usuario@exemplo.com',
    password: '123456'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
//VALIDAÇÃO DE LOGIN MOCKADO
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;


      if (email === this.mockUser.email && password === this.mockUser.password) {
        this.router.navigate(['/tasks']); // Redireciona para a página de tarefas
      } else {
        this.errorMessage = 'Email ou senha incorretos';
      }
    }
  }
}
