import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AssetSummary, untilDestroyed } from '@app/core';
import { AssetsStoreService } from './assets-store.service';

@Component({
  selector: 'app-assets',
  templateUrl: 'assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;
  @ViewChild('assetCode', { static: true }) assetCodeTpl: TemplateRef<any>;

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
        name: 'explorer.asset',
        prop: 'hash',
        sortable: true,
        cellTemplate: this.assetTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.assetCode',
        prop: 'assetCode',
        sortable: true,
        headerClass: 'text-center',
        cellClass: 'text-center',
        cellTemplate: this.assetCodeTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.totalSupply',
        prop: 'totalSupply',
        sortable: true,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.holders',
        prop: 'holdersCount',
        sortable: true,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
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
