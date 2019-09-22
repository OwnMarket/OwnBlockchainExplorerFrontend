import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlockService } from './block.service';
import { Logger } from '@app/core';

const log = new Logger('Block-Store');

@Injectable({ providedIn: 'root' })
export class BlockStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _blockInfo = new BehaviorSubject<any>({});
  private readonly _loadingBlockInfo = new BehaviorSubject<boolean>(false);
  private readonly _blocks = new BehaviorSubject<any[]>([]);
  private readonly _loadingBlocks = new BehaviorSubject<boolean>(false);
  private readonly _transactions = new BehaviorSubject<any[]>([]);
  private readonly _loadingTransactions = new BehaviorSubject<boolean>(false);
  private readonly _equivocations = new BehaviorSubject<any[]>([]);
  private readonly _loadingEquivocations = new BehaviorSubject<boolean>(false);
  private readonly _stakingRewards = new BehaviorSubject<any[]>([]);
  private readonly _loadingStakingRewards = new BehaviorSubject<boolean>(false);
  private readonly _canLoadMoreStakingRewards = new BehaviorSubject<boolean>(true);

  // Expose the observable$ part of the _blocks subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly blockInfo$ = this._blockInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingBlockInfo$ = this._loadingBlockInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly blocks$ = this._blocks.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingBlocks$ = this._loadingBlocks.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly transactions$ = this._transactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingTransactions$ = this._loadingTransactions.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly equivocations$ = this._equivocations.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingEquivocations$ = this._loadingEquivocations.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly stakingRewards$ = this._stakingRewards.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingStakingRewards$ = this._loadingStakingRewards.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly canLoadMoreStakingRewards$ = this._canLoadMoreStakingRewards.asObservable();

  constructor(private blockService: BlockService) {}

  // the getter will return the last value emitted in _blocks subject
  get blocks(): any[] {
    return this._blocks.getValue();
  }

  get lastBlock(): any {
    return this.blocks && this.blocks[0];
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

  get canLoadMoreStakingRewards(): boolean {
    return this._canLoadMoreStakingRewards.getValue();
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

  set loadingBlockInfo(val: boolean) {
    this._loadingBlockInfo.next(val);
  }

  set transactions(val: any[]) {
    this._transactions.next(val);
  }

  set appendTransactions(val: any[]) {
    this._transactions.next([...this.transactions, ...val]);
  }

  set loadingTransactions(val: boolean) {
    this._loadingTransactions.next(val);
  }

  set equivocations(val: any[]) {
    this._equivocations.next(val);
  }

  set appendEquivocations(val: any[]) {
    this._equivocations.next([...this.equivocations, ...val]);
  }

  set loadingEquivocations(val: boolean) {
    this._loadingEquivocations.next(val);
  }

  set stakingRewards(val: any[]) {
    this._stakingRewards.next(val);
  }

  set loadingStakingRewards(val: boolean) {
    this._loadingStakingRewards.next(val);
  }

  set canLoadMoreStakingRewards(value: boolean) {
    this._canLoadMoreStakingRewards.next(false);
  }

  set appendStakingRewards(val: any[]) {
    this._stakingRewards.next([...this.stakingRewards, ...val]);
  }

  getBlocks(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingBlocks = true;
    // TODO: catch error
    this.blockService.getBlocks({ page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendBlocks = res;
      } else {
        this.blocks = res;
      }
      this.loadingBlocks = false;
    });
  }

  getBlockInfo(blockNumber: number) {
    this.loadingBlockInfo = true;
    this.blockService.getBlockInfo(blockNumber).subscribe(res => {
      this.blockInfo = res;
      this.loadingBlockInfo = false;
    });
  }

  getTransactions(blockNumber: number, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingTransactions = true;
    this.blockService.getTransactions(blockNumber, { page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendTransactions = res;
      } else {
        this.transactions = res;
      }
      this.loadingTransactions = false;
    });
  }

  getEquivocations(blockNumber: number, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingEquivocations = true;
    this.blockService.getEquivocations(blockNumber, { page, limit }).subscribe(res => {
      if (shouldAppend) {
        this.appendEquivocations = res;
      } else {
        this.equivocations = res;
      }
      this.loadingEquivocations = false;
    });
  }

  getStakingRewards(blockNumber: number, page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingStakingRewards = true;
    this.blockService.getStakingRewards(blockNumber, { page, limit }).subscribe(res => {
      if (res.length > 0) {
        if (shouldAppend) {
          this.appendStakingRewards = res;
        } else {
          this.stakingRewards = res;
        }
      }

      if (res.length === 0) {
        this.canLoadMoreStakingRewards = false;
      }

      this.loadingStakingRewards = false;
    });
  }
}
