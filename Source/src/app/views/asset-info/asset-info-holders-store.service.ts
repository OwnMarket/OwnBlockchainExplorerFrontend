import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AssetHolderInfo } from '@app/core';
import { AssetInfoService } from './asset-info.service';

@Injectable({
  providedIn: 'root'
})
export class AssetHoldersStoreService {
  private _holders = new BehaviorSubject<AssetHolderInfo[]>([]);
  private _loadingHolders = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalholders = new BehaviorSubject<number>(0);

  readonly holders$ = this._holders.asObservable();
  readonly loadingHolders$ = this._loadingHolders.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalHolders$ = this._totalholders.asObservable();

  constructor(private service: AssetInfoService) {}

  get holders(): AssetHolderInfo[] {
    return this._holders.getValue();
  }

  get loadingHolders(): boolean {
    return this._loadingHolders.getValue();
  }

  get canLoadMore(): boolean {
    return this._canLoadMore.getValue();
  }

  get totalholders(): number {
    return this._totalholders.getValue();
  }

  set holders(value: AssetHolderInfo[]) {
    this._holders.next(value);
  }

  set loadingHolders(value: boolean) {
    this._loadingHolders.next(value);
  }

  set appendHolders(value: AssetHolderInfo[]) {
    this._holders.next([...this.holders, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalholders(value: number) {
    this._totalholders.next(value);
  }

  getAccountHolders(hash: string, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingHolders = true;
    return this.service.getAssetHolders(hash, page, limit).subscribe(res => {
      if (res.data.length > 0) {
        this.totalholders = res.data.length;
        if (shouldAppend) {
          this.appendHolders = res.data;
        } else {
          this.holders = res.data;
        }
      }
      if (res.data.length === 0) {
        this.canLoadMore = false;
      }
      this.loadingHolders = false;
    });
  }
}
