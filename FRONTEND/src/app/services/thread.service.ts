import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getThreadById(threadId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/thread/${threadId}`);
  }

  addResponse(response: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/response`, response);
  }
}
