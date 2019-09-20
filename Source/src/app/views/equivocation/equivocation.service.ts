import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equivocation } from '@app/core/models/equivocation.model';

@Injectable({
  providedIn: 'root'
})
export class EquivocationService {
  constructor(private http: HttpClient) {}

  getEquivocation(equivocationProofHash: string): Observable<Equivocation> {
    return this.http.get<Equivocation>(`/equivocation/${equivocationProofHash}`);
  }
}
