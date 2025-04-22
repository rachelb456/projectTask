import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../classes/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {
  baseUrl:string="https://localhost:44370/api/Task/";
  constructor(private httpClient: HttpClient) { }
  getTasks(title?: string):Observable<Array<Task>> {
    let params = new HttpParams();
  
  
  if (title) {
    params = params.set('title', title);
  }

  return this.httpClient.get<Array<Task>>(`${this.baseUrl}getAllTasks`, { params });

  }
  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseUrl + "addTask", task);
  }
  
  updateTask(task: Task): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl + "updateTask/" + task.id, task);
  }
    
  deleteTask(taskId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.baseUrl + "deleteTask/" + taskId);
  }
  getTaskById(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(this.baseUrl + "getTaskById/" + taskId);
  }
}
