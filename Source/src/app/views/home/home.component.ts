import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import * as moment from 'moment';
import _ from 'lodash';

import { BlockStoreService } from '../blocks/block-store.service';
import { TransactionStoreService } from '../transactions/transaction-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  lastBlock: number;
  view: any[] = [800, 200];

  // options
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Number';
  showYAxisLabel = false;
  yAxisLabel = 'Color Value';
  timeline = true;

  colorScheme = {
    domain: ['#fa591f']
  };

  public chartData: any[] = [];

  constructor(private blockStoreService: BlockStoreService, private transactionStoreService: TransactionStoreService) {}

  ngOnInit() {
    this.blockStoreService.blocks$.pipe(untilDestroyed(this)).subscribe(res => {
      const lB = this.blockStoreService.lastBlock;
      if (lB) {
        this.lastBlock = lB.blockNumber;
      }
    });

    this.transactionStoreService.transactions$.pipe(untilDestroyed(this)).subscribe(res => {
      res = _.sortBy(res, 'timestamp');
      const date = (item: any) => moment(item.timestamp).format('YYYY-MM-DD');
      const groupToDay = (tx: any, day: any) => {
        return {
          name: moment(day, 'YYYY-MM-DD').format('MM-DD'),
          value: tx ? tx.length : 0
        };
      };
      const result = _(res)
        .groupBy(date)
        .map(groupToDay)
        .value();

      this.chartData = [
        {
          name: '',
          series: result
        }
      ];
    });
  }

  ngOnDestroy() {}
}
