import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssetSummary } from '@app/core';
import { AssetsService } from './assets.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsStoreService {
  private _assets = new BehaviorSubject<AssetSummary[]>([]);
  private _loadingAssets = new BehaviorSubject<boolean>(false);
  private _canLoadMore = new BehaviorSubject<boolean>(true);
  private _totalAssets = new BehaviorSubject<number>(0);

  readonly assets$ = this._assets.asObservable();
  readonly loadingAssets$ = this._loadingAssets.asObservable();
  readonly canLoadMore$ = this._canLoadMore.asObservable();
  readonly totalAssets$ = this._totalAssets.asObservable();

  constructor(private service: AssetsService) {}

  get assets(): AssetSummary[] {
    return this._assets.getValue();
  }

  get loadingAssets(): boolean {
    return this._loadingAssets.getValue();
  }

  get canLoadMore(): boolean {
    return this._canLoadMore.getValue();
  }

  get totalAssets(): number {
    return this._totalAssets.getValue();
  }

  set assets(value: AssetSummary[]) {
    this._assets.next(value);
  }

  set loadingAssets(value: boolean) {
    this._loadingAssets.next(value);
  }

  set appendAssets(value: AssetSummary[]) {
    this._assets.next([...this.assets, ...value]);
  }

  set canLoadMore(value: boolean) {
    this._canLoadMore.next(value);
  }

  set totalAssets(value: number) {
    this._totalAssets.next(value);
  }

  getAssets(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingAssets = true;
    return this.service.getAssets(page, limit).subscribe(res => {
      if (res.data.length > 0) {
        this.totalAssets = res.data.length;
        if (shouldAppend) {
          this.appendAssets = res.data;
        } else {
          this.assets = res.data;
        }
      }

      if (res.data.length === 0) {
        this.canLoadMore = false;
      }

      this.loadingAssets = false;
    });
  }
}
