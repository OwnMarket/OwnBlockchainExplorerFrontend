import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiResponse } from '@app/core/models/api-response.model';
import { BlockItem } from '@app/core/models/block-item.model';
import { Block } from '@app/core/models/block.model';
import { BlockTx } from '@app/core/models/block-tx.model';
import { StakeReward } from '@app/core/models/stake-reward.model';

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

  getBlocks(context: PageLimitContext): Observable<BlockItem[]> {
    return this.httpClient.get<ApiResponse<BlockItem[]>>(routes.blocks(context)).pipe(
      map((response: any) => response.data),
      catchError(() => of('Error, could not load blocks'))
    );
  }

  getBlockInfo(context: number): Observable<Block> {
    return this.httpClient.get<ApiResponse<Block>>(routes.blockInfo(context)).pipe(
      map((response: any) => response.data),
      catchError(() => of('Error, could not get block info'))
    );
  }

  getTransactions(blockNumber: number, context: PageLimitContext): Observable<BlockTx[]> {
    return this.httpClient.get<ApiResponse<BlockTx[]>>(routes.transactionsByBlockNumber(blockNumber, context)).pipe(
      map((response: any) => response.data),
      catchError(() => of('Error, could not load transactions'))
    );
  }

  getEquivocations(blockNumber: number, context: PageLimitContext): Observable<[]> {
    return this.httpClient.get(routes.equivocationsByBlockNumber(blockNumber, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not load transactions'))
    );
  }

  getStakingRewards(blockNumber: number, context: PageLimitContext): Observable<StakeReward[]> {
    return this.httpClient
      .get<ApiResponse<StakeReward[]>>(routes.stakingRewardsByBlockNumber(blockNumber, context))
      .pipe(
        map((response: any) => response.data),
        catchError(() => of('Error, could not load transactions'))
      );
  }
}
