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

  totalFee(fee: number, numOfActions: number): any {
    const totalFee = +(fee * numOfActions).toFixed(7);
    return totalFee.toString();
  }

  getTransactionActions(shouldAppend: boolean = false) {
    if (!this.transactionHash) {
      return;
    }
    this.transactionStoreService.getTransactionActions(this.transactionHash, shouldAppend);
  }

  parseActions(actionData: string): any {
    const data = JSON.parse(actionData);
    return data;
  }
}
