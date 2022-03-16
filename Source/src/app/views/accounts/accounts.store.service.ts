import { Injectable } from '@angular/core';
import { AccountSummary } from '@app/core';
import { BehaviorSubject } from 'rxjs';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsStoreService {
  private _accounts = new BehaviorSubject<AccountSummary[]>([]);
  private _loadingAccounts = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalAccounts = new BehaviorSubject<number>(0);

  readonly accounts$ = this._accounts.asObservable();
  readonly loadingAccounts$ = this._loadingAccounts.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalAccounts$ = this._totalAccounts.asObservable();

  constructor(private service: AccountsService) {}

  get accounts(): AccountSummary[] {
    return this._accounts.getValue();
  }

  get loadingAccounts(): boolean {
    return this._loadingAccounts.getValue();
  }

  get canLoadMore(): boolean {
    return this._canLoadMore.getValue();
  }

  get totalAccounts(): number {
    return this._totalAccounts.getValue();
  }

  set accounts(value: AccountSummary[]) {
    this._accounts.next(value);
  }

  set loadingAccounts(value: boolean) {
    this._loadingAccounts.next(value);
  }

  set appendAccounts(value: AccountSummary[]) {
    this._accounts.next([...this.accounts, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalAccounts(value: number) {
    this._totalAccounts.next(value);
  }

  getAccounts(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingAccounts = true;
    return this.service.getAccounts(page, limit).subscribe(res => {
      if (res.data.length > 0) {
        this.totalAccounts = res.data.length;
        if (shouldAppend) {
          this.appendAccounts = res.data;
        } else {
          this.accounts = res.data;
        }
      }

      if (res.data.length === 0) {
        this.canLoadMore = false;
      }

      this.loadingAccounts = false;
    });
  }
}
