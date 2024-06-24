import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:8080/api/v1/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
