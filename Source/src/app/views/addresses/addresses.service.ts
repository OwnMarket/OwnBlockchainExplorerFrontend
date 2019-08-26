import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(currentPage: number, pageLimit: number, shouldAppend: boolean): Observable<any> {
    return this.http
      .get<any>('/stats/top-addresses?page=${currentPage}&limit=${pageLimit}')
      .pipe(map(response => response.data));
  }
}
