import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Comment, Hour } from '../../models/models-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}tasks/`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}tasks/`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}tasks/${id}/`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}tasks/${id}/`);
  }

  getTaskDetails(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}tasks/${taskId}/`);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}comments/`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}comments/`, comment);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}comments/${id}/`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}comments/${id}/`);
  }

  getTasksWorked(): Observable<Hour[]> {
    return this.http.get<Hour[]>(`${this.apiUrl}tasks_worked/`);
  }

  logHours(hour: Hour): Observable<Hour> {
    return this.http.post<Hour>(`${this.apiUrl}tasks_worked/`, hour);
  }

  updateHoursWorked(id: number, hour: Hour): Observable<Hour> {
    return this.http.put<Hour>(`${this.apiUrl}tasks_worked/${id}/`, hour);
  }

  deleteHoursWorked(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}tasks_worked/${id}/`);
  }
}
