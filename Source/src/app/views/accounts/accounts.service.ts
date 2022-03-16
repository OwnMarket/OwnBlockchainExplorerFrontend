import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountSummary, ApiResponse } from '@app/core';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAccounts(currentPage: number, pageLimit: number): Observable<ApiResponse<AccountSummary[]>> {
    return this.http.get<ApiResponse<AccountSummary[]>>(`/accounts?page=${currentPage}&limit=${pageLimit}`);
  }
}
