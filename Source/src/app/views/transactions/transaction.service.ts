import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TransactionStoreService } from './transaction-store.service';

const routes = {
  transactions: (c: PageLimitContext) => `/txs?page=${c.page}&limit=${c.limit}`,
  transactionInfo: (hash: string) => `/tx/${hash}`
};

//TODO: make common modal
export interface PageLimitContext {
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(context: PageLimitContext): Observable<any[]> {
    return this.httpClient.get<any[]>(routes.transactions(context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load transaction'))
    );
  }

  // TODO: add models
  getTransactionInfo(hash: string) {
    return this.httpClient.get<any>(routes.transactionInfo(hash)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get transaction info'))
    );
    // .subscribe((res: any) => {
    //   // this.transactionStoreService.transactionInfo = res;
    //   return res;
    // });
  }
}