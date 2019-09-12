import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { untilDestroyed, Logger } from '@app/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { BlockStoreService } from '../blocks/block-store.service';
import { HomeStoreService } from './home-store.service';

const log = new Logger('Home');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  lastBlock: number;
  view: any[] = [800, 100];

  // options
  showXAxis = false;
  showYAxis = false;
  gradient = true;
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

  constructor(private blockStoreService: BlockStoreService, private homeStoreService: HomeStoreService) {}

  ngOnInit() {
    this.blockStoreService.blocks$.pipe(untilDestroyed(this)).subscribe(res => {
      const lB = this.blockStoreService.lastBlock;
      if (lB) {
        this.lastBlock = lB.blockNumber;
      }
    });

    this.homeStoreService.transactionsByDay$.pipe(untilDestroyed(this)).subscribe(res => {
      const groupToDay = (item: any) => {
        return {
          name: moment(item.key, 'YYYY-MM-DD').format('DD'),
          value: item.value
        };
      };
      const result = _(res)
        .sortBy('key')
        .map(groupToDay)
        .value();

      this.chartData = [
        {
          name: '',
          series: result
        }
      ];
    });

    this.getTxByDay();
  }

  getTxByDay() {
    this.homeStoreService.getTransactionsByDay();
  }

  ngOnDestroy() {}
}
