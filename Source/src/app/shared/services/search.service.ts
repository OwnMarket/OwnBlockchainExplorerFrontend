import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const routes = {
  search: (hash: string) => `/search/${hash}`
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  searchByHash(hash: string): Observable<{}> {
    return this.httpClient.get<any>(routes.search(hash)).pipe(
      map((response: any) => response.data),
      catchError(() => of('Error, could not search.'))
    );
  }
}
