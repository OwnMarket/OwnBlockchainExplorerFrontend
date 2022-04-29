import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@app/core/models/api-response.model';
import { SearchResponse } from '@app/core';

const routes = {
  search: (hash: string) => `/search/${hash}`,
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  searchByHash(hash: string): Observable<SearchResponse> {
    return this.httpClient.get<ApiResponse<SearchResponse>>(routes.search(hash)).pipe(map((response) => response.data));
  }
}
