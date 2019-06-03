import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlockService } from './block.service';

@Injectable({ providedIn: 'root' })
export class BlockStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _blocks = new BehaviorSubject<any[]>([]);
  private readonly _loadingBlocks = new BehaviorSubject<boolean>(false);
  private readonly _blockInfo = new BehaviorSubject<any>({});
  private readonly _transactions = new BehaviorSubject<any[]>([]);
  private readonly _equivocations = new BehaviorSubject<any[]>([]);
  private readonly _stakingRewards = new BehaviorSubject<any[]>([]);

  // TODO: LOADING INDICATOR AS ARRAY FOR EACH ACTION

  // Expose the observable$ part of the _blocks subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly blocks$ = this._blocks.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingBlocks$ = this._loadingBlocks.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly blockInfo$ = this._blockInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly transactions$ = this._transactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly equivocations$ = this._equivocations.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly stakingRewards$ = this._stakingRewards.asObservable();

  constructor(private blockService: BlockService) {}

  // the getter will return the last value emitted in _blocks subject
  get blocks(): any[] {
    return this._blocks.getValue();
  }

  get blockInfo(): any {
    return this._blockInfo.getValue();
  }

  get transactions(): any[] {
    return this._transactions.getValue();
  }

  get equivocations(): any[] {
    return this._equivocations.getValue();
  }

  get stakingRewards(): any[] {
    return this._stakingRewards.getValue();
  }

  // assigning a value to this.blocks will push it onto the observable
  // and down to all of its subscribers (ex: this.blocks = [])
  set blocks(val: any[]) {
    this._blocks.next(val);
  }

  set loadingBlocks(val: boolean) {
    this._loadingBlocks.next(val);
  }

  set appendBlocks(val: any[]) {
    this._blocks.next([...this.blocks, ...val]);
  }

  set blockInfo(val: any) {
    this._blockInfo.next(val);
  }

  set transactions(val: any[]) {
    this._transactions.next(val);
  }

  // set appendTransactions(val: any[]) {
  //   this._transactions.next([...this.transactions, ...val]);
  // }

  set equivocations(val: any[]) {
    this._equivocations.next(val);
  }

  // set appendEquivocations(val: any[]) {
  //   this._equivocations.next([...this.equivocations, ...val]);
  // }

  set stakingRewards(val: any[]) {
    this._stakingRewards.next(val);
  }

  // set appendStakingRewards(val: any[]) {
  //   this._stakingRewards.next([...this.stakingRewards, ...val]);
  // }

  getBlocks(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingBlocks = true;
    // TODO: catch error
    this.blockService.getBlocks({ page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendBlocks = res;
      } else {
        this.blocks = res;
      }
      console.log(this.blocks);
      this.loadingBlocks = false;
    });
  }

  getBlockInfo(blockNumber: number) {
    this.blockService.getBlockInfo(blockNumber).subscribe(res => {
      this.blockInfo = res;
    });
  }

  getTransactions(blockNumber: number) {
    this.blockService.getTransactions(blockNumber).subscribe(res => {
      this.transactions = res;
    });
  }

  getEquivocations(blockNumber: number) {
    this.blockService.getEquivocations(blockNumber).subscribe(res => {
      this.equivocations = res;
    });
  }

  getStakingRewards(blockNumber: number) {
    this.blockService.getStakingRewards(blockNumber).subscribe(res => {
      this.stakingRewards = res;
    });
  }
}
