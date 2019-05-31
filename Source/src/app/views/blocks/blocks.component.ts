import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Logger, untilDestroyed } from '@app/core';

import { BlockService } from './block.service';
import { Observable } from 'rxjs';
import { BlockStoreService } from './block-store.service';

const log = new Logger('Blocks');

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
  // TODO: make models
  blocks: Observable<any[]>;
  // TODO: make general loader
  isLoading = false;
  pageLimit = 20;
  currentPage = 1;

  // TODO: Add table header module
  headers: any[] = [
    {
      label: 'Block Number',
      key: 'blockNumber',
      // TODO Use models for urls and Transaction
      url: (block: any) => ({
        route: '/block/',
        params: [block.blockNumber]
      })
    },
    {
      label: 'Block hash',
      key: 'hash'
    }
  ];

  constructor(private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.blocks = this.blockStoreService.blocks$;
    this.getBlocks();
  }
  ngOnDestroy() {}

  getBlocks() {
    this.blockStoreService.getBlocks(this.currentPage, this.pageLimit, true);

    // this.isLoading = true;
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
    // this.blockService
    //   .getBlocks({ page: 1, limit: 50 })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     }),
    //     untilDestroyed(this)
    //   )
    //   .subscribe(list => {
    //     this.blocks = list;
    //   });
  }

  onLoadMore(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage++;
      this.getBlocks();
    }
  }
}
