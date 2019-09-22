import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Logger, untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';

import { BlockStoreService } from '../block-store.service';

const log = new Logger('BlockInfo');

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit, OnDestroy {
  @ViewChild('txHash') txHash: TemplateRef<any>;
  @ViewChild('txAddress') txAddress: TemplateRef<any>;
  @ViewChild('txEquivocation') txEquivocation: TemplateRef<any>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;

  currentPage = {
    tx: 1,
    eq: 1,
    sr: 1
  };

  blockNumber: number;

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
  canLoadMoreStakingRewards: Observable<boolean>;
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
      this.canLoadMoreStakingRewards = this.blockStoreService.canLoadMoreStakingRewards$.pipe(untilDestroyed(this));

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
        name: 'Transaction hash',
        prop: 'hash',
        sortable: false,
        cellTemplate: this.txHash
      },
      {
        name: 'Sender address',
        prop: 'senderAddress',
        sortable: false,
        cellTemplate: this.txAddress
      },
      {
        name: 'Action',
        prop: 'numberOfActions',
        maxWidth: 70,
        sortable: false
      }
    ];

    this.equivocationColumns = [
      {
        name: 'EQ hash',
        prop: 'equivocationProofHash',
        sortable: false,
        cellTemplate: this.txEquivocation
      },
      {
        name: 'Slashed amount',
        prop: 'takenDeposit.amount',
        sortable: false
      }
    ];

    this.stakingRewardColumns = [
      {
        name: 'Staker address',
        prop: 'stakerAddress',
        sortable: false,
        cellTemplate: this.txAddress
      },
      {
        name: 'Amount',
        prop: 'amount',
        maxWidth: 150,
        sortable: false
      }
    ];
  }

  expandAdditionalInfo() {
    this.additionalInfoExpanded = !this.additionalInfoExpanded;
  }

  getBlockInfo() {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getBlockInfo(this.blockNumber);
  }

  getTransactions(shouldAppend: boolean = false) {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getTransactions(this.blockNumber, this.currentPage.tx, this.pageLimit, shouldAppend);
  }

  onLoadMoreTransactions(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.tx++;
      this.getTransactions(shouldLoad);
    }
  }

  getEquivocations(shouldAppend: boolean = false) {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getEquivocations(this.blockNumber, this.currentPage.eq, this.pageLimit, shouldAppend);
  }

  onLoadMoreEquivocations(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.eq++;
      this.getEquivocations(shouldLoad);
    }
  }

  getStakingRewards(shouldAppend: boolean = false) {
    if (!this.blockNumber) {
      return;
    }
    this.blockStoreService.getStakingRewards(this.blockNumber, this.currentPage.sr, this.pageLimit, shouldAppend);
  }

  onLoadMoreStakingRewards(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.sr++;
      this.getStakingRewards(shouldLoad);
    }
  }
}
