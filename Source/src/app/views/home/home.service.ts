import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  txPerDay: (numberOfDays: number) => `/stat/tx-per-day?numberOfDays=${numberOfDays}`
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getTxPerDay(numberOfDays: number): Observable<any[]> {
    return this.httpClient.get<any[]>(routes.txPerDay(numberOfDays)).pipe(
      map((response: any) => response.data),
      catchError(() => of('Error, could not load transaction by day'))
    );
  }
}
