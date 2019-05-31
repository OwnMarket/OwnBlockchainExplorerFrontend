import { Component, OnInit, OnDestroy } from '@angular/core';
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
  transactionHash: any;
  // TODO: make general loader
  isLoading = false;
  // TODO: make models
  transactionInfo: Observable<any>;

  basicInformationConfig: any;

  actionsConfig: any;

  constructor(
    private route: ActivatedRoute,
    private transactionStoreService: TransactionStoreService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        // this.isLoading = true;
        log.debug(params);
        this.transactionHash = params.get('hash');
        this.transactionInfo = this.transactionStoreService.transactionInfo$;
        this.getTransactionInfo();
        this.transactionStoreService.transactionInfo$.subscribe(res =>
          this.init()
        );
      });
  }

  init() {
    const txInfo = this.transactionStoreService.transactionInfo;
    this.basicInformationConfig = [
      { label: 'Transaction Hash', value: txInfo.txHash },
      {
        label: 'Block number',
        value: txInfo.blockNumber || '-',
        url: (item: any) => ({
          route: '/block/',
          params: [item.value]
        })
      }
    ];

    this.actionsConfig = [
      { label: 'Action type', key: 'actionType' },
      {
        label: 'Recipient address',
        render: (action: any) => action.actionData.recipientAddress
      },
      { label: 'Amount', render: (action: any) => action.actionData.amount }
    ];
  }

  ngOnDestroy() {}

  getTransactionInfo() {
    if (this.transactionHash) {
      this.transactionStoreService.getAddressInfo(this.transactionHash);
    }
  }
}
