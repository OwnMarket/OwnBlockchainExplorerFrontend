import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AccountHolding, AccountTransferInfo } from '@app/core';
import { AccountInfoService } from './account-info.service';

@Injectable({
  providedIn: 'root'
})
export class AccountHoldingsStoreService {
  private _holdings = new BehaviorSubject<AccountHolding[]>([]);
  private _loadingHoldings = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalHoldings = new BehaviorSubject<number>(0);

  readonly holdings$ = this._holdings.asObservable();
  readonly loadingHoldings$ = this._loadingHoldings.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalHoldings$ = this._totalHoldings.asObservable();

  constructor(private service: AccountInfoService) {}

  get holdings(): AccountHolding[] {
    return this._holdings.getValue();
  }

  get loadingholdings(): boolean {
    return this._loadingHoldings.getValue();
  }

  get canLoadMore(): boolean {
    return this._canLoadMore.getValue();
  }

  get totalHoldings(): number {
    return this._totalHoldings.getValue();
  }

  set holdings(value: AccountHolding[]) {
    this._holdings.next(value);
  }

  set loadingHoldings(value: boolean) {
    this._loadingHoldings.next(value);
  }

  set appendHoldings(value: AccountHolding[]) {
    this._holdings.next([...this.holdings, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalHoldings(value: number) {
    this._totalHoldings.next(value);
  }

  getAccountHoldings(hash: string, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingHoldings = true;
    return this.service.getAccountHoldings(hash, page, limit).subscribe(res => {
      if (res.data.length > 0) {
        this.totalHoldings = res.data.length;
        if (shouldAppend) {
          this.appendHoldings = res.data;
        } else {
          this.holdings = res.data;
        }
      }

      if (res.data.length === 0) {
        this.canLoadMore = false;
      }

      this.loadingHoldings = false;
    });
  }
}
