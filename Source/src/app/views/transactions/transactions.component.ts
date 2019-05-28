import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';

const log = new Logger('Transactions');
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  // TODO: make models
  transactions: any[];
  // TODO: make general loader
  isLoading = false;

  // TODO Add table header module
  headers: any[] = [
    // TODO Use models for items, in this case Transaction
    {
      label: '',
      render: (transaction: any) =>
        `<span class="badge badge-pill ${
          transaction.numberOfActions >= 3 ? 'badge-success' : 'badge-danger'
        }"><i class="fas fa-check"></i></span>`
    },
    {
      label: 'Transaction Hash',
      key: 'hash',
      // TODO Use models for urls and Transaction
      url: (transaction: any) => ({
        route: '/transaction-info/',
        params: [transaction.hash]
      })
    },
    { label: 'Block Number', key: 'blockNumber' },
    {
      label: 'Sender Address',
      key: 'senderAddress',
      // TODO Use models for urls and Transaction
      url: (transaction: any) => ({
        route: '/address-info/',
        params: [transaction.senderAddress]
      })
    },
    { label: 'Action', key: 'numberOfActions' }
  ];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.getTransactions();
  }

  ngOnDestroy() {}

  getTransactions() {
    // TODO: add pagination
    this.isLoading = true;
    this.transactionsService
      .getTransactions({ page: 1, limit: 50 })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(list => {
        log.debug(list);
        this.transactions = list;
      });
  }
}
