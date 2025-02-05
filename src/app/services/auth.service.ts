// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }


  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Armazena o token e o ID do usuário no localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id); // Adicione esta linha
      })
    );
  }


  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId) : null;
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

}
