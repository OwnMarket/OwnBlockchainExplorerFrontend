import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AssetBridgeTransferInfo } from '@app/core';
import { AssetInfoService } from './asset-info.service';

@Injectable({
  providedIn: 'root'
})
export class AssetBridgeTransfersStoreService {
  private _transfers = new BehaviorSubject<AssetBridgeTransferInfo[]>([]);
  private _loadingTransfers = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalTransfers = new BehaviorSubject<number>(0);

  readonly transfers$ = this._transfers.asObservable();
  readonly loadingTransfers$ = this._loadingTransfers.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalTransfers$ = this._totalTransfers.asObservable();

  constructor(private service: AssetInfoService) {}

  get transfers(): AssetBridgeTransferInfo[] {
    return this._transfers.getValue();
  }

  get loadingTransfers(): boolean {
    return this._loadingTransfers.getValue();
  }

  get canLoadMore(): boolean {
    return this._canLoadMore.getValue();
  }

  get totalTransfers(): number {
    return this._totalTransfers.getValue();
  }

  set transfers(value: AssetBridgeTransferInfo[]) {
    this._transfers.next(value);
  }

  set loadingTransfers(value: boolean) {
    this._loadingTransfers.next(value);
  }

  set appendTransfers(value: AssetBridgeTransferInfo[]) {
    this._transfers.next([...this.transfers, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalTransfers(value: number) {
    this._totalTransfers.next(value);
  }

  getAssetBridgeTransfers(hash: string, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingTransfers = true;
    return this.service.getAssetBridgeTransfers(hash).subscribe(res => {
      if (res.data.length > 0) {
        this.totalTransfers = res.data.length;
        if (shouldAppend) {
          this.appendTransfers = res.data;
        } else {
          this.transfers = res.data;
        }
      }

      if (res.data.length === 0) {
        this.canLoadMore = false;
      }

      this.loadingTransfers = false;
    });
  }
}
