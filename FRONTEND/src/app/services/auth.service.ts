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
    this.usernameSubject = new BehaviorSubject<string>('');
    this.userSubject = new BehaviorSubject<User | null>(null);

    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      this.usernameSubject.next(localStorage.getItem('username') || '');
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getUserDetails(parseInt(userId, 10)).subscribe((user) => {
          this.userSubject.next(user);
        });
      }
    } else {
      console.warn('localStorage is not available');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  public getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    } else {
      console.warn('localStorage is not available');
      return null;
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
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }
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
            if (this.isLocalStorageAvailable()) {
              localStorage.setItem('userId', response.userId.toString());
              localStorage.setItem('username', user.username);
            }
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

  public getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  validateCurrentPassword(currentPassword: string): Observable<boolean> {
    return this.http
      .post<{ valid: boolean }>(`${this.apiUrl}/user/validate-password`, {
        password: currentPassword,
      })
      .pipe(
        map((response) => response.valid),
        catchError(() => of(false))
      );
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http
      .post<{ message: string }>(
        `${this.apiUrl}/user/change-password`,
        { currentPassword, newPassword },
        { headers }
      )
      .pipe(
        map((response) => {
          console.log(response.message);
          return true;
        }),
        catchError((error) => {
          console.error(
            'Error en la solicitud de cambio de contraseña:',
            error
          );
          return of(false);
        })
      );
  }

  private getUserIdFromLocalStorage(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/password/reset`, { email })
      .pipe(
        tap(() =>
          console.log('Correo de restablecimiento de contraseña enviado')
        ),
        catchError((error) => {
          console.error(
            'Error al enviar el correo de restablecimiento de contraseña:',
            error
          );
          throw error;
        })
      );
  }

  updatePassword(token: string, password: string): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/password/update`, { token, newPassword: password })
      .pipe(
        tap(() => console.log('Contraseña actualizada con éxito')),
        catchError((error) => {
          console.error('Error al actualizar la contraseña:', error);
          throw error;
        })
      );
  }
}
