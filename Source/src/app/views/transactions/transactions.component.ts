import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger, untilDestroyed } from '@app/core';
import { TransactionStoreService } from './transaction-store.service';

const log = new Logger('Transactions');

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('txHash', { static: true }) txHash: TemplateRef<any>;
  @ViewChild('txBlock', { static: true }) txBlock: TemplateRef<any>;
  @ViewChild('txAddress', { static: true }) txAddress: TemplateRef<any>;
  @ViewChild('txBadge', { static: true }) txBadge: TemplateRef<any>;

  transactions: Observable<any[]>;
  isLoading: Observable<boolean>;
  apiTimer: any;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private transactionStoreService: TransactionStoreService) {}

  ngOnInit() {
    this.columns = [
      {
        name: '',
        prop: 'status',
        maxWidth: 50,
        sortable: false,
        cellTemplate: this.txBadge,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.transactionHash',
        prop: 'hash',
        sortable: false,
        cellTemplate: this.txHash,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.blockNumber',
        prop: 'blockNumber',
        maxWidth: 150,
        sortable: false,
        cellTemplate: this.txBlock,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.senderAddress',
        prop: 'senderAddress',
        sortable: false,
        cellTemplate: this.txAddress,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.actions',
        prop: 'numberOfActions',
        maxWidth: 100,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.transactions = this.transactionStoreService.transactions$.pipe(untilDestroyed(this));
    this.isLoading = this.transactionStoreService.loadingTransactions$.pipe(untilDestroyed(this));
    this.getTransactions();
    this.apiTimer = setInterval(() => {
      this.getTransactions();
    }, 30000);
  }

  ngOnDestroy() {
    clearInterval(this.apiTimer);
  }

  getTransactions(shouldAppend: boolean = false) {
    this.transactionStoreService.getTransactions(this.currentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage++;
      this.getTransactions(true);
    }
  }
}
