import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private isLoggedIn = false;
  private usernameSubject: BehaviorSubject<string>;
  private userSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    this.usernameSubject = new BehaviorSubject<string>(
      localStorage.getItem('username') || ''
    );
    this.userSubject = new BehaviorSubject<User | null>(null);

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getUserDetails(parseInt(userId, 10)).subscribe((user) => {
        this.userSubject.next(user);
      });
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string; userId: number }>(`${this.apiUrl}/user/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.token && response.userId) {
            this.isLoggedIn = true;
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('username', username);
            this.usernameSubject.next(username);
            this.getUserDetails(response.userId).subscribe((user) => {
              this.userSubject.next(user);
            });
          }
        }),
        map((response) => !!response.token),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.usernameSubject.next('');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  registerUser(user: any): Observable<any> {
    return this.http
      .post<{ userId: number }>(`${this.apiUrl}/user/register`, user)
      .pipe(
        tap((response) => {
          if (response.userId) {
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('username', user.username);
            this.getUserDetails(response.userId).subscribe((userDetails) => {
              this.userSubject.next(userDetails);
            });
          }
        }),
        catchError((error) => {
          console.error('Error registering user', error);
          return of(null);
        })
      );
  }

  private getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
