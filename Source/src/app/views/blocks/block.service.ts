import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  blocks: (c: PageLimitContext) => `/blocks?page=${c.page}&limit=${c.limit}`,
  blockInfo: (blockNumber: number) => `/block/${blockNumber}`,
  transactionsByBlockNumber: (blockNumber: number, c: PageLimitContext) =>
    `/block/${blockNumber}/transactions?page=${c.page}&limit=${c.limit}`,
  equivocationsByBlockNumber: (blockNumber: number, c: PageLimitContext) =>
    `/block/${blockNumber}/equivocations?page=${c.page}&limit=${c.limit}`,
  stakingRewardsByBlockNumber: (blockNumber: number, c: PageLimitContext) =>
    `/block/${blockNumber}/staking-rewards?page=${c.page}&limit=${c.limit}`
};

// TODO: Make common modal for PageLimitContext
export interface PageLimitContext {
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  constructor(private httpClient: HttpClient) {}

  // TODO: add models
  getBlocks(context: PageLimitContext): Observable<[]> {
    return this.httpClient.get(routes.blocks(context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load blocks'))
    );
  }

  // TODO: add models
  getBlockInfo(context: number): Observable<any> {
    return this.httpClient.get(routes.blockInfo(context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get block info'))
    );
  }

  // TODO: add models
  getTransactions(blockNumber: number, context: PageLimitContext): Observable<[]> {
    return this.httpClient.get(routes.transactionsByBlockNumber(blockNumber, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load transactions'))
    );
  }

  // TODO: add models
  getEquivocations(blockNumber: number, context: PageLimitContext): Observable<[]> {
    return this.httpClient.get(routes.equivocationsByBlockNumber(blockNumber, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load transactions'))
    );
  }

  // TODO: add models
  getStakingRewards(blockNumber: number, context: PageLimitContext): Observable<[]> {
    return this.httpClient.get(routes.stakingRewardsByBlockNumber(blockNumber, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load transactions'))
    );
  }
}
