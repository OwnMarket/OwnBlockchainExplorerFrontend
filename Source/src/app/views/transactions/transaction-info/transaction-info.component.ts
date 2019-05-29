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

  basicInformationConfig: any;

  actionsConfig: any;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        // this.isLoading = true;
        log.debug(params);
        this.transactionHash = params.get('hash');
        this.getTransactionInfo();
      });
  }

  init() {
    this.basicInformationConfig = [
      { label: 'Transaction Hash', value: this.transactionInfo.txHash },
      {
        label: 'Block number',
        value: this.transactionInfo.blockNumber || '-',
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
          this.init();
        });
    }
    // this.transactionInfo = {
    //   txHash: 'CRjqV3DLh7jyCKZqj2pCdfw3s3ynXxEf5JMVm1rCYjmp',
    //   senderAddress: 'CHLsVaYSPJGFi8BNGd6tP1VvB8UdKbVRDKD',
    //   nonce: 1,
    //   expirationTime: 0,
    //   actionFee: 0.001,
    //   actions: [
    //     {
    //       actionType: 'TransferChx',
    //       actionData: {
    //         recipientAddress: 'CHfDeuB1y1eJnWd6aWfYaRvpS9Qgrh1eqe7',
    //         amount: 100
    //       }
    //     }
    //   ],
    //   status: 'Pending',
    //   errorCode: null,
    //   failedActionNumber: null,
    //   blockNumber: null
    // };
    // this.init();
  }
}
