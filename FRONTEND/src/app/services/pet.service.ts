import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:8080/api/v1/pets';

  constructor(private http: HttpClient) {}

  getAnimalTypes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pet-type`);
  }

  getBreedsByType(typeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pet-breed/by-type?typeId=${typeId}`);
  }

  createPet(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getPetsByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/selectbyuser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
