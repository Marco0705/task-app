import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../interfaces/task-item';
import { CreateTaskRequest } from '../interfaces/create-task-request';
import { UpdateTaskRequest } from '../interfaces/update-task-request';

@Injectable({ providedIn: 'root' })
export class TaskApiService {

  private baseUrl = 'http://localhost:8082/api/tasks';

  private http = inject(HttpClient);


  list(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.baseUrl);
  }

  create(req: CreateTaskRequest): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.baseUrl, req);
  }

  update(id: string, req: UpdateTaskRequest): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}