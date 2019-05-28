import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';
import { TransactionsService } from '../transactions.service';

const log = new Logger('TransactionInfo');

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit, OnDestroy {
  transactionHash: any;
  // TODO: make general loader
  isLoading = false;
  // TODO: make models
  transactionInfo: any;

  constructor(private route: ActivatedRoute, private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.isLoading = true;
      log.debug(params);
      this.transactionHash = params.get('hash');
      this.getTransactionInfo();
    });
  }

  ngOnDestroy() {}

  getTransactionInfo() {
    if (this.transactionHash) {
      this.transactionsService
        .getTransactionInfo(this.transactionHash)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(info => {
          log.debug(info);
          this.transactionInfo = info;
        });
    }
  }
}
