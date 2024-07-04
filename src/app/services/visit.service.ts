import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VetVisit } from '../models/vet-visit';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private apiUrl = 'https://petwellness.onrender.com/api/v1/vetvisits';

  constructor(private http: HttpClient) {}

  getVisitsByPetId(petId: number): Observable<VetVisit[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<VetVisit[]>(`${this.apiUrl}/pet/${petId}`, {
      headers,
    });
  }

  getVisitById(petId: number, visitId: number): Observable<VetVisit> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<VetVisit>(`${this.apiUrl}/${visitId}`, { headers });
  }

  createVisit(petId: number, visitData: VetVisit): Observable<VetVisit> {
    return this.http.post<VetVisit>(
      `${this.apiUrl}/create`,
      { ...visitData, petId },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  updateVisit(visit: VetVisit): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put<void>(`${this.apiUrl}/${visit.id}`, visit, {
      headers,
    });
  }

  deleteVisit(visitId: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/${visitId}`, { headers });
  }
}
