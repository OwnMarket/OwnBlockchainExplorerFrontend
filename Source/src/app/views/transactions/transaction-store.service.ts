import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionService } from './transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _transactions = new BehaviorSubject<any[]>([]);
  private readonly _transactionInfo = new BehaviorSubject<any>({});
  // TODO: LOADING INDICATOR AS ARRAY FOR EACH ACTION

  // Expose the observable$ part of the _transactions subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly transactions$ = this._transactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly transactionInfo$ = this._transactionInfo.asObservable();

  constructor(private transactionService: TransactionService) {}

  // the getter will return the last value emitted in _transactions subject
  get transactions(): any[] {
    return this._transactions.getValue();
  }

  get transactionInfo(): any {
    return this._transactionInfo.getValue();
  }

  // assigning a value to this.transactions will push it onto the observable
  // and down to all of its subsribers (ex: this.transactions = [])
  set transactions(val: any[]) {
    this._transactions.next(val);
  }

  set transactionInfo(val: any) {
    this._transactionInfo.next(val);
  }

  set appendTransactions(val: any[]) {
    this._transactions.next([...this.transactions, ...val]);
  }

  getAddressInfo(transactionHash: string) {
    this.transactionService
      .getTransactionInfo(transactionHash)
      .subscribe(res => {
        this.transactionInfo = res;
      });
  }

  getTransactions(page: number, limit: number, shouldAppend: boolean = false) {
    this.transactionService.getTransactions({ page, limit }).subscribe(res => {
      console.log(res);
      if (shouldAppend) {
        this.appendTransactions = res;
      } else {
        this.transactions = res;
      }
    });
  }
}
