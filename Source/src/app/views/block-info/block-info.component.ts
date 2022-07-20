import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Logger, untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';
import { BlockStoreService } from '../blocks/block-store.service';

const log = new Logger('BlockInfo');

@Component({
  selector: 'app-block-info',
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss'],
})
export class BlockInfoComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('txHash', { static: true }) txHash: TemplateRef<any>;
  @ViewChild('txAddress', { static: true }) txAddress: TemplateRef<any>;
  @ViewChild('txEquivocation', { static: true }) txEquivocation: TemplateRef<any>;
  @ViewChild('rewardPerc', { static: true }) rewardPerc: TemplateRef<any>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;

  currentPage = {
    tx: 1,
    eq: 1,
    sr: 1,
  };

  blockNumber: number;

  blockInfo: Observable<any>;
  loadingBlockInfo: Observable<boolean>;

  previousBlockConfig: any;
  additionalInfoExpanded = false;

  validatorColumns: any[];
  validatorBlacklistColumns: any[];

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

  error$: Observable<any>;

  public isAddCollapsed = true;

  constructor(private route: ActivatedRoute, private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.setupColumns();
      this.blockNumber = +params.get('number');

      this.blockInfo = this.blockStoreService.blockInfo$.pipe(untilDestroyed(this));
      this.loadingBlockInfo = this.blockStoreService.loadingBlockInfo$.pipe(untilDestroyed(this));
      this.error$ = this.blockStoreService.error$.pipe(untilDestroyed(this));

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
    this.validatorColumns = [
      {
        name: 'explorer.address',
        prop: 'validatorAddress',
        sortable: false,
        cellTemplate: this.txAddress,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.networkAddress',
        prop: 'networkAddress',
        sortable: false,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.rewardPercent',
        prop: 'sharedRewardPercent',
        sortable: true,
        maxWidth: 150,
        cellTemplate: this.rewardPerc,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.stake',
        prop: 'totalStake',
        sortable: true,
        maxWidth: 150,
        headerTemplate: this.headerTpl,
      },
    ];

    this.validatorBlacklistColumns = [
      {
        name: 'explorer.address',
        prop: 'validatorAddress',
        sortable: false,
        cellTemplate: this.txAddress,
        headerTemplate: this.headerTpl,
      },
    ];

    this.transactionColumns = [
      {
        name: 'explorer.txHash',
        prop: 'hash',
        sortable: false,
        cellTemplate: this.txHash,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.senderAddress',
        prop: 'senderAddress',
        sortable: false,
        cellTemplate: this.txAddress,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.action',
        prop: 'numberOfActions',
        maxWidth: 70,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.equivocationColumns = [
      {
        name: 'explorer.eqHash',
        prop: 'equivocationProofHash',
        sortable: false,
        cellTemplate: this.txEquivocation,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.slashedAmount',
        prop: 'takenDeposit.amount',
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.stakingRewardColumns = [
      {
        name: 'explorer.stakerAddress',
        prop: 'stakerAddress',
        sortable: false,
        cellTemplate: this.txAddress,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        maxWidth: 150,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];
  }

  formatValidatorsBlacklist(list: string[]): any[] {
    return list.map((item) => ({ validatorAddress: item }));
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
