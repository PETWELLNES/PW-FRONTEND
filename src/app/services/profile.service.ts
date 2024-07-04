import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  uploadFile(
    url: string,
    formData: FormData,
    headers?: HttpHeaders
  ): Observable<any> {
    return this.http
      .post(url, formData, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error uploading file', error);
          return of(null);
        })
      );
  }
}
