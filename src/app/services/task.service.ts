import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { Comment } from '../../models/comments';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/`);
  }

  getTaskDetails(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}/`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks/`, task);
  }

  // Usamos PATCH para atualizar apenas os campos enviados
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}/`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}/`);
  }

  addComment(comment: { note: string; taskId: number }): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/`, comment);
  }

  logHours(hours: { hours: number; taskId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks_worked/`, hours);
  }
}
