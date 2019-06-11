import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HomeService } from './home.service';

@Injectable({ providedIn: 'root' })
export class HomeStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _transactionsByDay = new BehaviorSubject<any[]>([]);
  private readonly _loadingTransactionsByDay = new BehaviorSubject<boolean>(false);

  // Expose the observable$ part of the _transactions subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly transactionsByDay$ = this._transactionsByDay.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingTransactionsByDay$ = this._loadingTransactionsByDay.asObservable();

  constructor(private homeService: HomeService) {}

  // the getter will return the last value emitted in _transactions subject
  get transactionsByDay(): any[] {
    return this._transactionsByDay.getValue();
  }

  // assigning a value to this.transactions will push it onto the observable
  // and down to all of its subsribers (ex: this.transactions = [])
  set transactionsByDay(val: any[]) {
    this._transactionsByDay.next(val);
  }

  set loadingTransactionsByDay(val: boolean) {
    this._loadingTransactionsByDay.next(val);
  }

  getTransactionsByDay(numberOfDay: number = 7) {
    this.loadingTransactionsByDay = true;
    this.homeService.getTxPerDay(numberOfDay).subscribe(res => {
      this.transactionsByDay = res;
      this.loadingTransactionsByDay = false;
    });
  }
}
