import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionService } from './transaction.service';

@Injectable({ providedIn: 'root' })
export class TransactionStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _transactions = new BehaviorSubject<any[]>([]);
  private readonly _loadingTransactions = new BehaviorSubject<boolean>(false);
  private readonly _transactionInfo = new BehaviorSubject<any>({});
  private readonly _loadingTransactionInfo = new BehaviorSubject<boolean>(false);
  private readonly _transactionActions = new BehaviorSubject<any[]>([]);
  private readonly _loadingTransactionActions = new BehaviorSubject<boolean>(false);

  // Expose the observable$ part of the _transactions subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly transactions$ = this._transactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingTransactions$ = this._loadingTransactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly transactionInfo$ = this._transactionInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingTransactionInfo$ = this._loadingTransactionInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly transactionActions$ = this._transactionActions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingTransactionActions$ = this._loadingTransactionActions.asObservable();

  constructor(private transactionService: TransactionService) {}

  // the getter will return the last value emitted in _transactions subject
  get transactions(): any[] {
    return this._transactions.getValue();
  }

  get transactionInfo(): any {
    return this._transactionInfo.getValue();
  }

  get transactionActions(): any[] {
    return this._transactionActions.getValue();
  }

  // assigning a value to this.transactions will push it onto the observable
  // and down to all of its subsribers (ex: this.transactions = [])
  set transactions(val: any[]) {
    this._transactions.next(val);
  }

  set loadingTransactions(val: boolean) {
    this._loadingTransactions.next(val);
  }

  set transactionInfo(val: any) {
    this._transactionInfo.next(val);
  }

  set loadingTransactionInfo(val: boolean) {
    this._loadingTransactionInfo.next(val);
  }

  set transactionActions(val: any[]) {
    this._transactionActions.next(val);
  }

  set loadingTransactionActions(val: boolean) {
    this._loadingTransactionActions.next(val);
  }

  set appendTransactionActions(val: any[]) {
    this._transactionActions.next([...this.transactionActions, ...val]);
  }

  set appendTransactions(val: any[]) {
    this._transactions.next([...this.transactions, ...val]);
  }

  getTransactionInfo(transactionHash: string) {
    this.loadingTransactionInfo = true;
    this.transactionService.getTransactionInfo(transactionHash).subscribe(res => {
      this.transactionInfo = res;
      this.loadingTransactionInfo = false;
    });
  }

  getTransactions(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingTransactions = true;
    this.transactionService.getTransactions({ page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendTransactions = res;
      } else {
        this.transactions = res;
      }
      this.loadingTransactions = false;
    });
  }

  getTransactionActions(hash: string, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingTransactionActions = true;
    this.transactionService.getTransactionActions(hash, { page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendTransactionActions = res;
      } else {
        this.transactionActions = res;
      }
      this.loadingTransactionActions = false;
    });
  }
}
