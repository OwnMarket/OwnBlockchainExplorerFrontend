import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AccountTransferInfo } from '@app/core';
import { AccountInfoService } from './account-info.service';

@Injectable({
  providedIn: 'root'
})
export class AccountTransfersStoreService {
  private _transfers = new BehaviorSubject<AccountTransferInfo[]>([]);
  private _loadingTransfers = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalTransfers = new BehaviorSubject<number>(0);

  readonly transfers$ = this._transfers.asObservable();
  readonly loadingTransfers$ = this._loadingTransfers.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalTransfers$ = this._totalTransfers.asObservable();

  constructor(private service: AccountInfoService) {}

  get transfers(): AccountTransferInfo[] {
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

  set transfers(value: AccountTransferInfo[]) {
    this._transfers.next(value);
  }

  set loadingTransfers(value: boolean) {
    this._loadingTransfers.next(value);
  }

  set appendTransfers(value: AccountTransferInfo[]) {
    this._transfers.next([...this.transfers, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalTransfers(value: number) {
    this._totalTransfers.next(value);
  }

  getAccountTransfers(hash: string, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingTransfers = true;
    return this.service.getAccountTransfers(hash, page, limit).subscribe(res => {
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
