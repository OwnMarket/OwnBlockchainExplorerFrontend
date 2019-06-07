import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger, untilDestroyed } from '@app/core';
import { TransactionStoreService } from './transaction-store.service';

const log = new Logger('Transactions');

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @ViewChild('txHash') txHash: TemplateRef<any>;
  @ViewChild('txBlock') txBlock: TemplateRef<any>;
  @ViewChild('txAddress') txAddress: TemplateRef<any>;
  @ViewChild('txBadge') txBadge: TemplateRef<any>;

  transactions: Observable<any[]>;
  isLoading: Observable<boolean>;

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
        cellTemplate: this.txBadge
      },
      {
        name: 'Transaction hash',
        prop: 'hash',
        sortable: false,
        cellTemplate: this.txHash
      },
      {
        name: 'Block Number',
        prop: 'blockNumber',
        maxWidth: 150,
        sortable: false,
        cellTemplate: this.txBlock
      },
      {
        name: 'Sender Address',
        prop: 'senderAddress',
        sortable: false,
        cellTemplate: this.txAddress
      }
    ];

    this.transactions = this.transactionStoreService.transactions$.pipe(untilDestroyed(this));
    this.isLoading = this.transactionStoreService.loadingTransactions$.pipe(untilDestroyed(this));
    this.getTransactions();
  }

  ngOnDestroy() {}

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
