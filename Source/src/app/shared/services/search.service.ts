import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

const routes = {
  search: (hash: string) => `/search/${hash}`
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  searchByHash(hash: string): Observable<{}> {
    return this.httpClient.get<any>(routes.search(hash)).pipe(
      map((response: any) => response.data),
      catchError(err => {
        err.error.alerts.forEach((alert: any) => {
          this.toastr.error(alert.message);
        });
        return of();
      })
    );
  }
}
