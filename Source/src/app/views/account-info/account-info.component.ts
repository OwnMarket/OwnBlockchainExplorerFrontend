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
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  @ViewChild('tx', { static: true }) txTpl: TemplateRef<any>;
  @ViewChild('account', { static: true }) accountTpl: TemplateRef<any>;
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;

  accountHash: Observable<string>;
  accountInfo: Observable<AccountInfo>;
  accountTransferInfo: Observable<AccountTransferInfo[]>;
  accountHoldingInfo: Observable<any>;

  tableHeight = '500px';
  pageLimit = 20;

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
      map(params => {
        const hash = params.get('hash');
        this.accountInfo = this.accountInfoService.getAccountInfo(hash).pipe(map(resp => resp.data));
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
    this.transferColumns = [
      {
        name: 'Transaction',
        prop: 'hash',
        cellTemplate: this.txTpl
      },
      {
        name: 'From',
        prop: 'fromAccountHash',
        cellTemplate: this.accountTpl
      },
      {
        name: 'To',
        prop: 'toAccountHash',
        cellTemplate: this.accountTpl
      },
      {
        name: 'Date/time',
        prop: 'date'
      },
      {
        name: 'Amount',
        prop: 'amount',
        headerClass: 'text-right',
        cellClass: 'text-right'
      },
      {
        name: 'Asset',
        prop: 'assetCode',
        headerClass: 'text-right',
        cellClass: 'text-right'
      }
    ];
    this.holdingColumns = [
      {
        name: 'Hash',
        prop: 'hash',
        cellTemplate: this.assetTpl
      },
      {
        name: 'Code',
        prop: 'assetCode',
        headerClass: 'text-right',
        cellClass: 'text-right'
      },
      {
        name: 'Amount',
        prop: 'amount',
        headerClass: 'text-right',
        cellClass: 'text-right'
      }
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
