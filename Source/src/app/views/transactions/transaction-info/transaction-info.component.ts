import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';
import { TransactionStoreService } from '../transaction-store.service';

const log = new Logger('TransactionInfo');

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit, OnDestroy {
  @Input() pageLimit = 20;
  currentPage = 1;

  transactionHash: string;
  actionsExpanded = false;

  transactionInfo: Observable<any>;
  loadingTransactionInfo: Observable<boolean>;
  transactionActions: Observable<any[]>;
  loadingTransactionActions: Observable<boolean>;

  constructor(private route: ActivatedRoute, private transactionStoreService: TransactionStoreService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      log.debug(params);
      this.transactionHash = params.get('hash');

      this.transactionInfo = this.transactionStoreService.transactionInfo$.pipe(untilDestroyed(this));
      this.loadingTransactionInfo = this.transactionStoreService.loadingTransactionInfo$.pipe(untilDestroyed(this));

      this.transactionActions = this.transactionStoreService.transactionActions$.pipe(untilDestroyed(this));
      this.loadingTransactionActions = this.transactionStoreService.loadingTransactionActions$.pipe(
        untilDestroyed(this)
      );

      this.getTransactionInfo();
    });
  }

  ngOnDestroy() {}

  expandActions() {
    this.actionsExpanded = !this.actionsExpanded;
    if (this.actionsExpanded) {
      this.getTransactionActions();
    }
  }

  getTransactionInfo() {
    if (this.transactionHash) {
      this.transactionStoreService.getTransactionInfo(this.transactionHash);
    }
  }

  getTransactionActions(shouldAppend: boolean = false) {
    if (!this.transactionHash) {
      return;
    }
    this.transactionStoreService.getTransactionActions(
      this.transactionHash,
      this.currentPage,
      this.pageLimit,
      shouldAppend
    );
  }

  onLoadMoreTransactionActions(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage++;
      this.getTransactionActions(shouldLoad);
    }
  }
}
