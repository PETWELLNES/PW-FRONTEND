import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';
  private usernameSubject: BehaviorSubject<string>;
  private userSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.usernameSubject = new BehaviorSubject<string>(
      localStorage.getItem('username') || ''
    );
    this.userSubject = new BehaviorSubject<User | null>(null);
  }

  updateUserDetails(userId: number, user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${userId}`, user).pipe(
      tap(() => {
        if (user.username) {
          localStorage.setItem('username', user.username);
          this.usernameSubject.next(user.username);
        }
        this.userSubject.next(user);
      })
    );
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
