import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Logger, untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';
import { CryptoService } from '@app/shared/services/crypto.service';
import { TransactionStoreService } from '../transactions/transaction-store.service';

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
  actionsExpanded = true;

  transactionInfo: Observable<any>;
  loadingTransactionInfo: Observable<boolean>;
  transactionActions: Observable<any[]>;
  loadingTransactionActions: Observable<boolean>;
  expandedTransactionActions: any;
  selectedActions: any;

  constructor(
    private route: ActivatedRoute,
    private transactionStoreService: TransactionStoreService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.transactionHash = params.get('hash');

      this.transactionInfo = this.transactionStoreService.transactionInfo$.pipe(untilDestroyed(this));
      this.loadingTransactionInfo = this.transactionStoreService.loadingTransactionInfo$.pipe(untilDestroyed(this));

      this.transactionActions = this.transactionStoreService.transactionActions$.pipe(untilDestroyed(this));
      this.loadingTransactionActions = this.transactionStoreService.loadingTransactionActions$.pipe(
        untilDestroyed(this)
      );

      this.getTransactionInfo();
      this.getTransactionActions(false);
    });
  }

  ngOnDestroy() {}

  expandActions(val: boolean) {
    this.actionsExpanded = !this.actionsExpanded;
  }

  deriveHash(address: string, nonce: number, txActionNumber: number) {
    return this.cryptoService.deriveHash(address, nonce, txActionNumber);
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
    this.transactionStoreService.getTransactionActions(this.transactionHash, shouldAppend);
  }

  onLoadMoreTransactionActions(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage++;
      this.getTransactionActions(shouldLoad);
    }
  }

  parseActions(actionData: string): any {
    const data = JSON.parse(actionData);
    return data;
  }

  expandActionData(action: any, index: number) {
    this.expandedTransactionActions = {};
    if (action && action.actionData) {
      if (action.actionType == 'CreateAsset' || action.actionType == 'CreateAccount') {
        this.expandedTransactionActions.isEmpty = false;
        let tx = null;
        this.transactionInfo.subscribe(response => {
          tx = response;
          let hash = this.cryptoService.deriveHash(tx.senderAddress, tx.nonce, index + 1);
          let label = action.actionType == 'CreateAsset' ? 'assetHash' : 'accountHash';
          action.actionData = `{"${label}": "${hash}"}`;
        });
      }
      try {
        this.expandedTransactionActions = JSON.parse(action.actionData);
      } catch (error) {
        log.error(error);
        return;
      }
      if (this.selectedActions !== action) {
        this.expandedTransactionActions.custom_index = index;
        this.expandedTransactionActions.isEmpty = Object.keys(this.expandedTransactionActions).length === 1;
        this.selectedActions = action;
      } else {
        this.selectedActions = {};
      }
    }
  }
}
