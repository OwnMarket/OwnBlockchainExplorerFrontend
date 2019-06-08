import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';

import { BlockStoreService } from '../blocks/block-store.service';

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
  // autoScale = true;

  public multi = [
    {
      name: '',
      series: [
        {
          value: 6013,
          name: '2016-09-16T19:27:39.261Z'
        },
        {
          value: 5059,
          name: '2016-09-16T15:59:31.202Z'
        },
        {
          value: 4127,
          name: '2016-09-20T10:40:07.914Z'
        },
        {
          value: 3266,
          name: '2016-09-15T19:15:29.524Z'
        },
        {
          value: 6766,
          name: '2016-09-12T20:55:49.021Z'
        }
      ]
    }
  ];

  constructor(private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.blockStoreService.blocks$.pipe(untilDestroyed(this)).subscribe(res => {
      const lB = this.blockStoreService.lastBlock;
      if (lB) {
        this.lastBlock = lB.blockNumber;
      }
    });
  }

  ngOnDestroy() {}
}
