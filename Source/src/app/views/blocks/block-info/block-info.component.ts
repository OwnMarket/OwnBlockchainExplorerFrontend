import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Logger, untilDestroyed } from '@app/core';
import { switchMap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BlockStoreService } from '../block-store.service';

const log = new Logger('BlockInfo');

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit, OnDestroy {
  blockNumber: number;
  // TODO: make general loader
  isLoading = false;
  // TODO: make models
  blockInfo: Observable<any>;
  // TODO: make models
  transactions: Observable<any[]>;

  // TODO: Add table header module
  transactionsHeaders: any[] = [
    {
      label: 'Transaction Hash',
      key: 'hash'
    },
    {
      label: 'Sender Address',
      key: 'senderAddress'
    },
    {
      label: 'Action',
      key: 'numberOfActions'
    }
  ];

  // TODO: make models
  equivocations: Observable<any[]>;
  equivocationsHeaders: any[] = [
    {
      label: 'EQ Hash',
      key: 'equivocationProofHash'
    },
    // {
    //   label: 'EQ validator address',
    //   key: 'senderAddress',
    // },
    {
      label: 'Slashed amount',
      key: 'takenDeposit.amount'
    }
  ];

  // TODO: make models
  stakingRewards: Observable<any[]>;
  stakingRewardsHeaders: any[] = [
    {
      label: 'Staker Address',
      key: 'stakerAddress'
    },
    {
      label: 'Amount',
      key: 'amount'
    }
  ];

  public isAddCollapsed = true;

  constructor(
    private route: ActivatedRoute,
    private blockStoreService: BlockStoreService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        log.debug(params);
        this.blockNumber = +params.get('number');
        this.blockInfo = this.blockStoreService.blockInfo$;
        this.transactions = this.blockStoreService.transactions$;
        this.equivocations = this.blockStoreService.equivocations$;
        this.stakingRewards = this.blockStoreService.stakingRewards$;

        this.getBlockInfo();
        this.getTransactions();
        this.getEquivocations();
        this.getStakingRewards();
      });
  }

  ngOnDestroy() {}

  getBlockInfo() {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getBlockInfo(this.blockNumber);
  }

  getTransactions() {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getTransactions(this.blockNumber);
  }

  getEquivocations() {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getEquivocations(this.blockNumber);
  }

  getStakingRewards() {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getStakingRewards(this.blockNumber);
  }
}
