import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@app/core/models/api-response.model';
import { AddressStat } from '@app/core/models/address-stat.model';
import { pipe } from '@angular/core/src/render3';

@Injectable()
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(currentPage: number, pageLimit: number, shouldAppend: boolean): Observable<ApiResponse<AddressStat>> {
    return this.http.get<ApiResponse<AddressStat>>(`/stats/top-addresses?page=${currentPage}&limit=${pageLimit}`);
  }
}
