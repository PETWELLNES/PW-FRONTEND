import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.apiUrl}/user/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.isLoggedIn = true;
          localStorage.setItem('token', response.token);
        }
      }),
      map(response => !!response.token),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, user);
  }
}
