import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/core/models/api-response.model';
import { AddressStat } from '@app/core/models/address-stat.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(currentPage: number, pageLimit: number): Observable<ApiResponse<AddressStat>> {
    return this.http.get<ApiResponse<AddressStat>>(`/stats/top-addresses?page=${currentPage}&limit=${pageLimit}`);
  }
}
