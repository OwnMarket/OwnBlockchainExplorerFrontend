import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, AssetSummary } from '@app/core';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  constructor(private http: HttpClient) {}

  getAssets(currentPage: number, pageLimit: number): Observable<ApiResponse<AssetSummary[]>> {
    return this.http.get<ApiResponse<AssetSummary[]>>(`/assets?page=${currentPage}&limit=${pageLimit}`);
  }
}
