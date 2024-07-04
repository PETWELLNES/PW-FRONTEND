import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(
      `${this.apiUrl}/comments/${response.postId}`,
      response,
      { headers }
    );
  }

  updateResponse(responseId: number, updatedResponse: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(
      `${this.apiUrl}/comments/${responseId}`,
      updatedResponse,
      { headers }
    );
  }

  getResponsesByParentPostId(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/comments/post/${postId}`, { headers });
  }
}
