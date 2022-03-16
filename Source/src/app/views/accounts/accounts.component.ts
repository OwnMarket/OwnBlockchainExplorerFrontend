import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountSummary, untilDestroyed } from '@app/core';
import { AccountsStoreService } from './accounts.store.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  @ViewChild('address', { static: true }) addressTpl: TemplateRef<any>;
  @ViewChild('account', { static: true }) accountTpl: TemplateRef<any>;

  accounts: Observable<AccountSummary[]>;
  isLoading: Observable<boolean>;
  canLoad: Observable<boolean>;
  accountCount: Observable<number>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private accountStoreService: AccountsStoreService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'Account',
        prop: 'hash',
        sortable: true,
        cellTemplate: this.accountTpl
      },
      {
        name: 'Controller address',
        prop: 'controllerAddress',
        sortable: true,
        cellTemplate: this.addressTpl
      },
      {
        name: 'Assets',
        prop: 'assetsCount',
        sortable: true,
        headerClass: 'text-right',
        cellClass: 'text-right'
      }
    ];

    this.accounts = this.accountStoreService.accounts$.pipe(untilDestroyed(this));
    this.isLoading = this.accountStoreService.loadingAccounts$.pipe(untilDestroyed(this));
    this.canLoad = this.accountStoreService.canLoadMore$.pipe(untilDestroyed(this));
    this.accountCount = this.accountStoreService.totalAccounts$.pipe(untilDestroyed(this));
    this.getAddresses();
  }

  ngOnDestroy(): void {}

  getAddresses(shouldAppend: boolean = false) {
    this.accountStoreService.getAccounts(this.currentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(event: any) {
    this.currentPage++;
    this.getAddresses(true);
  }
}
