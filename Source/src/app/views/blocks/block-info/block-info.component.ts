import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;

  blockNumber: number;
  canLoadMore = false;

  blockInfo: Observable<any>;
  loadingBlockInfo: Observable<boolean>;

  previousBlockConfig: any;
  additionalInfoExpanded = false;

  transactions: Observable<any[]>;
  loadingTransactions: Observable<boolean>;
  transactionColumns: any[];

  equivocations: Observable<any[]>;
  loadingEquivocations: Observable<boolean>;
  equivocationColumns: any[];

  stakingRewards: Observable<any[]>;
  loadingStakingRewards: Observable<boolean>;
  stakingRewardColumns: any[];

  public isAddCollapsed = true;

  constructor(private route: ActivatedRoute, private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.setupColumns();
      this.blockNumber = +params.get('number');

      this.blockInfo = this.blockStoreService.blockInfo$.pipe(untilDestroyed(this));
      this.loadingBlockInfo = this.blockStoreService.loadingBlockInfo$.pipe(untilDestroyed(this));

      this.transactions = this.blockStoreService.transactions$.pipe(untilDestroyed(this));
      this.loadingTransactions = this.blockStoreService.loadingTransactions$.pipe(untilDestroyed(this));

      this.equivocations = this.blockStoreService.equivocations$.pipe(untilDestroyed(this));
      this.loadingEquivocations = this.blockStoreService.loadingEquivocations$.pipe(untilDestroyed(this));

      this.stakingRewards = this.blockStoreService.stakingRewards$.pipe(untilDestroyed(this));
      this.loadingStakingRewards = this.blockStoreService.loadingStakingRewards$.pipe(untilDestroyed(this));

      this.getBlockInfo();
      this.getTransactions();
      this.getEquivocations();
      this.getStakingRewards();
    });
  }

  ngOnDestroy() {}

  setupColumns() {
    this.transactionColumns = [
      {
        name: 'Transaction Hash',
        prop: 'hash',
        sortable: false
      },
      {
        name: 'Sender Address',
        prop: 'senderAddress',
        sortable: false
      },
      {
        name: 'Action',
        prop: 'numberOfActions',
        maxWidth: 50,
        sortable: false
      }
    ];

    this.equivocationColumns = [
      {
        name: 'EQ Hash',
        prop: 'equivocationProofHash',
        sortable: false
      },
      {
        name: 'Slashed amount',
        prop: 'takenDeposit.amount',
        sortable: false
      }
    ];

    this.stakingRewardColumns = [
      {
        name: 'Staker Address',
        prop: 'stakerAddress',
        sortable: false
      },
      {
        name: 'Amount',
        prop: 'amount',
        sortable: false
      }
    ];
  }

  // init() {
  //   // TODO: Add real data
  //   this.basicInfoConfig = [
  //     {
  //       label: 'Block number',
  //       render: (item: any) => `<span style="color: #eb6723;"><strong>block.blockNumber</strong></span>`
  //     },
  //     {
  //       label: 'Hash',
  //       value: 'block.hash',
  //       url: (item: any) => ({
  //         route: '/transaction-info/',
  //         params: [item.value]
  //       })
  //     }
  //   ];

  //   this.previousBlockConfig = [
  //     { label: 'Previous block', value: 'previousBlock.blockNumber' },
  //     { label: 'Hash', value: 'previousBlock.hash' }
  //   ];
  // }

  expandAdditionalInfo() {
    this.additionalInfoExpanded = !this.additionalInfoExpanded;
  }

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
