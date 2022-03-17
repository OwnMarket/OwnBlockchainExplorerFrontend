import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountHolding, AccountInfo, AccountTransferInfo, ApiResponse } from '@app/core';

@Injectable({ providedIn: 'root' })
export class AccountInfoService {
  constructor(private http: HttpClient) {}

  getAccountInfo(accountHash: string): Observable<ApiResponse<AccountInfo>> {
    return this.http.get<ApiResponse<AccountInfo>>(`/accounts/${accountHash}`);
  }

  getAccountTransfers(
    accountHash: string,
    currentPage: number,
    pageLimit: number
  ): Observable<ApiResponse<AccountTransferInfo[]>> {
    return this.http.get<ApiResponse<AccountTransferInfo[]>>(
      `/accounts/${accountHash}/transfers?page=${currentPage}&limit=${pageLimit}`
    );
  }

  getAccountHoldings(
    accountHash: string,
    currentPage: number,
    pageLimit: number
  ): Observable<ApiResponse<AccountHolding[]>> {
    return this.http.get<ApiResponse<AccountHolding[]>>(
      `/accounts/${accountHash}/holdings?page=${currentPage}&limit=${pageLimit}`
    );
  }
}
