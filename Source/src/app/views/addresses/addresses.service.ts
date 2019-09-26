import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/core/models/api-response.model';
import { AddressSummary } from '@app/core/models/address-summary.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(currentPage: number, pageLimit: number): Observable<ApiResponse<AddressSummary>> {
    return this.http.get<ApiResponse<AddressSummary>>(`/stats/top-addresses?page=${currentPage}&limit=${pageLimit}`);
  }
}
