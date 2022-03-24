import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountHolding, AccountInfo, AccountTransferInfo, untilDestroyed } from '@app/core';
import { AccountInfoService } from './account-info.service';
import { AccountTransfersStoreService } from './account-transfers-store.service';
import { AccountHoldingsStoreService } from './account-holdings-store.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('tx', { static: true }) txTpl: TemplateRef<any>;
  @ViewChild('account', { static: true }) accountTpl: TemplateRef<any>;
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;
  @ViewChild('assetCode', { static: true }) assetCodeTpl: TemplateRef<any>;

  tableHeight = '500px';
  pageLimit = 20;

  accountHash: Observable<string>;
  accountInfo: Observable<AccountInfo>;

  transferColumns: any = [];
  transfersCurrentPage: number = 1;
  transfers: Observable<AccountTransferInfo[]>;
  transfersLoading: Observable<boolean>;
  transfersCanLoad: Observable<boolean>;
  transfersCount: Observable<number>;

  holdingColumns: any = [];
  holdingsCurrentPage: number = 1;
  holdings: Observable<AccountHolding[]>;
  holdingsLoading: Observable<boolean>;
  holdingsCanLoad: Observable<boolean>;
  holdingsCount: Observable<number>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountInfoService: AccountInfoService,
    private accountTransfersStore: AccountTransfersStoreService,
    private accountHoldingsStore: AccountHoldingsStoreService
  ) {
    this.accountHash = this.activatedRoute.paramMap.pipe(
      map((params) => {
        const hash = params.get('hash');
        this.accountInfo = this.accountInfoService.getAccountInfo(hash).pipe(map((resp) => resp.data));
        this.transfers = this.accountTransfersStore.transfers$.pipe(untilDestroyed(this));
        this.transfersLoading = this.accountTransfersStore.loadingTransfers$.pipe(untilDestroyed(this));
        this.transfersCanLoad = this.accountTransfersStore.canLoadMore$.pipe(untilDestroyed(this));
        this.transfersCount = this.accountTransfersStore.totalTransfers$.pipe(untilDestroyed(this));
        this.getTransfers(hash);
        this.holdings = this.accountHoldingsStore.holdings$.pipe(untilDestroyed(this));
        this.holdingsLoading = this.accountHoldingsStore.loadingHoldings$.pipe(untilDestroyed(this));
        this.holdingsCanLoad = this.accountHoldingsStore.canLoadMore$.pipe(untilDestroyed(this));
        this.holdingsCount = this.accountHoldingsStore.totalHoldings$.pipe(untilDestroyed(this));
        this.getHoldings(hash);
        return hash;
      })
    );
  }

  ngOnInit(): void {
    this.accountTransfersStore.transfers = [];
    this.accountHoldingsStore.holdings = [];
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
      {
        name: 'explorer.asset',
        prop: 'assetCode',
        headerClass: 'text-right',
        cellClass: 'text-right',
        cellTemplate: this.assetCodeTpl,
        headerTemplate: this.headerTpl,
      },
    ];
    this.holdingColumns = [
      {
        name: 'explorer.hash',
        prop: 'assetHash',
        cellTemplate: this.assetTpl,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.code',
        prop: 'assetCode',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'balance',
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];
  }

  ngOnDestroy(): void {}

  getTransfers(hash: string, shouldAppend: boolean = false) {
    this.accountTransfersStore.getAccountTransfers(hash, this.transfersCurrentPage, this.pageLimit, shouldAppend);
  }

  getHoldings(hash: string, shouldAppend: boolean = false) {
    this.accountHoldingsStore.getAccountHoldings(hash, this.transfersCurrentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(hash: string, resource: string) {
    if (resource === 'transfers') {
      this.transfersCurrentPage++;
      this.getTransfers(hash, true);
    }
    if (resource === 'holdings') {
      this.holdingsCurrentPage++;
      this.getHoldings(hash, true);
    }
  }
}
