import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse, AssetBridgeTransferInfo, AssetHolderInfo, AssetInfo, AssetTransferInfo } from '@app/core';

@Injectable({ providedIn: 'root' })
export class AssetInfoService {
  constructor(private http: HttpClient) {}

  getAssetInfo(assetHash: string): Observable<ApiResponse<AssetInfo>> {
    return this.http.get<ApiResponse<AssetInfo>>(`/assets/${assetHash}`);
  }

  getAssetTransfers(
    assetHash: string,
    currentPage: number,
    pageLimit: number
  ): Observable<ApiResponse<AssetTransferInfo[]>> {
    return this.http.get<ApiResponse<AssetTransferInfo[]>>(
      `/assets/${assetHash}/transfers?page=${currentPage}&limit=${pageLimit}`
    );
  }

  getAssetBridgeTransfers(assetHash: string): Observable<ApiResponse<AssetBridgeTransferInfo[]>> {
    return this.http.get<ApiResponse<AssetBridgeTransferInfo[]>>(`/assets/${assetHash}/transfers/bridge`);
  }

  getAssetHolders(
    assetHash: string,
    currentPage: number,
    pageLimit: number
  ): Observable<ApiResponse<AssetHolderInfo[]>> {
    return this.http.get<ApiResponse<AssetHolderInfo[]>>(
      `/assets/${assetHash}/holders?page=${currentPage}&limit=${pageLimit}`
    );
  }
}
