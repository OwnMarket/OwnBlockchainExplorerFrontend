import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AssetInfo, AssetTransferInfo, AssetHolderInfo, untilDestroyed, AssetBridgeTransferInfo } from '@app/core';
import { AssetInfoService } from './asset-info.service';
import { AssetTransfersStoreService } from './asset-info-transfers-store.service';
import { AssetHoldersStoreService } from './asset-info-holders-store.service';
import { AssetBridgeTransfersStoreService } from './asset-info-bridge-transfers-store.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss'],
})
export class AssetInfoComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('tx', { static: true }) txTpl: TemplateRef<any>;
  @ViewChild('account', { static: true }) accountTpl: TemplateRef<any>;
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;
  @ViewChild('assetCode', { static: true }) assetCodeTpl: TemplateRef<any>;
  @ViewChild('contract', { static: true }) contractTpl: TemplateRef<any>;
  @ViewChild('bridgeTxType', { static: true }) bridgeTxTypeTpl: TemplateRef<any>;
  @ViewChild('originalHash', { static: true }) originalHashTpl: TemplateRef<any>;
  @ViewChild('swapHash', { static: true }) swapHashTpl: TemplateRef<any>;

  tableHeight = '500px';
  bridgeTableHeight = '150px';
  pageLimit = 20;

  assetHash: Observable<string>;
  assetInfo: Observable<AssetInfo>;
  assetBridgeStatsCols: any = [];

  transferColumns: any = [];
  transfersCurrentPage: number = 1;
  transfers: Observable<AssetTransferInfo[]>;
  transfersLoading: Observable<boolean>;
  transfersCanLoad: Observable<boolean>;
  transfersCount: Observable<number>;

  bridgeTransferColumns: any = [];
  bridgeTransfersCurrentPage: number = 1;
  bridgeTransfers: Observable<AssetBridgeTransferInfo[]>;
  bridgeTransfersLoading: Observable<boolean>;
  bridgeTransfersCanLoad: Observable<boolean>;
  bridgeTransfersCount: Observable<number>;

  holderColumns: any = [];
  holdersCurrentPage: number = 1;
  holders: Observable<AssetHolderInfo[]>;
  holdersLoading: Observable<boolean>;
  holdersCanLoad: Observable<boolean>;
  holdersCount: Observable<number>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetInfoService: AssetInfoService,
    private assetTransfersStore: AssetTransfersStoreService,
    private assetBridgeTransfersStore: AssetBridgeTransfersStoreService,
    private assetHoldersStore: AssetHoldersStoreService
  ) {
    this.assetHash = this.activatedRoute.paramMap.pipe(
      map((params) => {
        const hash = params.get('hash');
        this.assetInfo = this.assetInfoService.getAssetInfo(hash).pipe(map((resp) => resp.data));
        this.transfers = this.assetTransfersStore.transfers$.pipe(untilDestroyed(this));
        this.transfersLoading = this.assetTransfersStore.loadingTransfers$.pipe(untilDestroyed(this));
        this.transfersCanLoad = this.assetTransfersStore.canLoadMore$.pipe(untilDestroyed(this));
        this.transfersCount = this.assetTransfersStore.totalTransfers$.pipe(untilDestroyed(this));
        this.getTransfers(hash);
        this.bridgeTransfers = this.assetBridgeTransfersStore.transfers$.pipe(untilDestroyed(this));
        this.bridgeTransfersLoading = this.assetBridgeTransfersStore.loadingTransfers$.pipe(untilDestroyed(this));
        this.bridgeTransfersCanLoad = this.assetBridgeTransfersStore.canLoadMore$.pipe(untilDestroyed(this));
        this.bridgeTransfersCount = this.assetBridgeTransfersStore.totalTransfers$.pipe(untilDestroyed(this));
        this.getBridgeTransfers(hash);
        this.holders = this.assetHoldersStore.holders$.pipe(untilDestroyed(this));
        this.holdersLoading = this.assetHoldersStore.loadingHolders$.pipe(untilDestroyed(this));
        this.holdersCanLoad = this.assetHoldersStore.canLoadMore$.pipe(untilDestroyed(this));
        this.holdersCount = this.assetHoldersStore.totalHolders$.pipe(untilDestroyed(this));
        this.getHolders(hash);
        return hash;
      })
    );
  }

  ngOnInit(): void {
    this.assetBridgeTransfersStore.transfers = [];
    this.assetBridgeTransfersStore.transfers = [];
    this.assetHoldersStore.holders = [];
    this.transferColumns = [
      {
        name: 'explorer.transaction',
        prop: 'hash',
        cellTemplate: this.txTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.from',
        prop: 'fromAccountHash',
        cellTemplate: this.accountTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.to',
        prop: 'toAccountHash',
        cellTemplate: this.accountTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.dateTime',
        prop: 'date',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.assetBridgeStatsCols = [
      {
        name: 'explorer.contract',
        prop: 'contractAddress',
        cellTemplate: this.contractTpl,
        headerTemplate: this.headerTpl,
        minWidth: 420,
      },
      {
        name: 'explorer.blockchain',
        prop: 'blockchainCode',
        headerClass: 'text-center',
        cellClass: 'text-center uppercase',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.transfers',
        prop: 'transfersCount',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.supply',
        prop: 'circulatingSupply',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.bridgeTransferColumns = [
      {
        name: 'explorer.originalHash',
        prop: 'originalTxHash',
        cellTemplate: this.originalHashTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.swapTxHash',
        prop: 'swapTxHash',
        cellTemplate: this.swapHashTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.bridgeTransferType',
        prop: 'transferTypeCode',
        cellTemplate: this.bridgeTxTypeTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.blockchain',
        prop: 'blockchainCode',
        headerClass: 'text-center',
        cellClass: 'text-center uppercase',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.dateTime',
        prop: 'blockTime',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];
    this.holderColumns = [
      {
        name: 'explorer.account',
        prop: 'accountHash',
        cellTemplate: this.accountTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.balance',
        prop: 'balance',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];
  }

  ngOnDestroy(): void {}

  getBridgeExplorerUrl(chainCode: string): string {
    if (chainCode === 'Bsc') return environment.bscExplorerUrl;
    if (chainCode === 'Eth') return environment.ethExplorerUrl;
  }

  getTransfers(hash: string, shouldAppend: boolean = false) {
    this.assetTransfersStore.getAssetTransfers(hash, this.transfersCurrentPage, this.pageLimit, shouldAppend);
  }

  getBridgeTransfers(hash: string, shouldAppend: boolean = false) {
    this.assetBridgeTransfersStore.getAssetBridgeTransfers(
      hash,
      this.transfersCurrentPage,
      this.pageLimit,
      shouldAppend
    );
  }

  getHolders(hash: string, shouldAppend: boolean = false) {
    this.assetHoldersStore.getAssetHolders(hash, this.transfersCurrentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(hash: string, resource: string) {
    if (resource === 'transfers') {
      this.transfersCurrentPage++;
      this.getTransfers(hash, true);
    }
    if (resource === 'holders') {
      this.holdersCurrentPage++;
      this.getHolders(hash, true);
    }
  }
}
