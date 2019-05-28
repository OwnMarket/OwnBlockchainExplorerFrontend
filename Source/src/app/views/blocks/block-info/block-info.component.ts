import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Logger, untilDestroyed } from '@app/core';
import { switchMap, finalize } from 'rxjs/operators';
import { BlocksService } from '../blocks.service';

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
  blockInfo: any;
  // TODO: make models
  transactions: any[];
  // TODO: make models
  equivocations: any[];
  // TODO: make models
  stakingRewards: any[];

  public isAddCollapsed = true;

  constructor(private route: ActivatedRoute, private blocksService: BlocksService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      log.debug(params);
      this.blockNumber = +params.get('number');
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

    this.blocksService
      .getBlockInfo(this.blockNumber)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(info => {
        log.debug(info);
        this.blockInfo = info;
      });
  }

  getTransactions() {
    if (!this.blockNumber) {
      return;
    }
    this.blocksService
      .getTransactions(this.blockNumber)
      .pipe(
        finalize(() => {
          // this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(list => {
        log.debug(list);
        this.transactions = list;
      });
  }

  getEquivocations() {
    if (!this.blockNumber) {
      return;
    }
    this.blocksService
      .getEquivocations(this.blockNumber)
      .pipe(
        finalize(() => {
          // this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(list => {
        log.debug(list);
        this.equivocations = list;
      });
  }

  getStakingRewards() {
    if (!this.blockNumber) {
      return;
    }
    this.blocksService
      .getstakingRewards(this.blockNumber)
      .pipe(
        finalize(() => {
          // this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(list => {
        log.debug(list);
        this.stakingRewards = list;
      });
  }
}
