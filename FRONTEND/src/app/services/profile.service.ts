import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  uploadFile(url: string, formData: FormData): Observable<any> {
    return this.http.post<any>(url, formData).pipe(
      catchError((error) => {
        console.error('Error uploading file', error);
        return of(null);
      })
    );
  }
}
