import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Logger, untilDestroyed } from '@app/core';

import { BlocksService } from './blocks.service';

const log = new Logger('Blocks');

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
  // TODO: make models
  blocks: any[];
  // TODO: make general loader
  isLoading = false;
  // error: string | undefined;

  constructor(private blocksService: BlocksService) {}

  ngOnInit() {
    log.debug('init');
    this.getBlocks();
  }
  ngOnDestroy() {}

  getBlocks() {
    this.isLoading = true;

    // TODO: use params from pagination
    // const blocks$ = this.blocksService.getBlocks({ page: 1, limit: 50 });
    // blocks$
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     }),
    //     untilDestroyed(this)
    //   )
    //   .subscribe(
    //     list => {
    //       log.debug(list);
    //       this.blocks = list;
    //     },
    //     error => {
    //       log.debug(`Login error: ${error}`);
    //       this.error = error;
    //     }
    //   );

    // TODO: use params from pagination
    this.blocksService
      .getBlocks({ page: 1, limit: 50 })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(list => {
        this.blocks = list;
      });
  }
}
