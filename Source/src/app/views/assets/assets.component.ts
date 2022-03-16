import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AssetSummary, untilDestroyed } from '@app/core';
import { AssetsStoreService } from './assets-store.service';

@Component({
  selector: 'app-assets',
  templateUrl: 'assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;

  assets: Observable<AssetSummary[]>;
  isLoading: Observable<boolean>;
  canLoad: Observable<boolean>;
  assetCount: Observable<number>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private assetsStoreService: AssetsStoreService) {}

  ngOnInit(): void {
    this.columns = [
      {
        name: 'Asset',
        prop: 'hash',
        sortable: true,
        cellTemplate: this.assetTpl
      },
      {
        name: 'Asset code',
        prop: 'assetCode',
        sortable: true,
        headerClass: 'text-center',
        cellClass: 'text-center'
      },
      {
        name: 'Total supply',
        prop: 'totalSupply',
        sortable: true,
        headerClass: 'text-right',
        cellClass: 'text-right'
      },
      {
        name: 'Holders',
        prop: 'holdersCount',
        sortable: true,
        headerClass: 'text-right',
        cellClass: 'text-right'
      }
    ];

    this.assets = this.assetsStoreService.assets$.pipe(untilDestroyed(this));
    this.isLoading = this.assetsStoreService.loadingAssets$.pipe(untilDestroyed(this));
    this.canLoad = this.assetsStoreService.canLoadMore$.pipe(untilDestroyed(this));
    this.assetCount = this.assetsStoreService.totalAssets$.pipe(untilDestroyed(this));
    this.getAssets();
  }
  ngOnDestroy(): void {}

  getAssets(shouldAppend: boolean = false) {
    this.assetsStoreService.getAssets(this.currentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(event: any) {
    this.currentPage++;
    this.getAssets(true);
  }
}
