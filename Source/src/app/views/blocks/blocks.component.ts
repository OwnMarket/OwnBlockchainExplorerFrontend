import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger, untilDestroyed } from '@app/core';
import { BlockStoreService } from './block-store.service';

const log = new Logger('Blocks');
@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('linkBlock', { static: true }) linkBlock: TemplateRef<any>;
  @ViewChild('passedTime', { static: true }) passedTime: TemplateRef<any>;

  blocks: Observable<any[]>;
  isLoading: Observable<boolean>;

  apiTimer: any;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'explorer.blockNumber',
        prop: 'blockNumber',
        sortable: false,
        maxWidth: 150,
        cellTemplate: this.linkBlock,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.blockHash',
        prop: 'hash',
        sortable: false,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.timestamp',
        prop: 'timestamp',
        maxWidth: 150,
        sortable: false,
        cellTemplate: this.passedTime,
        headerTemplate: this.headerTpl,
      },
    ];

    this.blocks = this.blockStoreService.blocks$.pipe(untilDestroyed(this));
    this.isLoading = this.blockStoreService.loadingBlocks$.pipe(untilDestroyed(this));
    this.getBlocks();

    this.apiTimer = setInterval(() => {
      this.getBlocks();
    }, 30000);
  }

  ngOnDestroy() {
    clearInterval(this.apiTimer);
  }

  getBlocks(shouldAppend: boolean = false) {
    this.blockStoreService.getBlocks(this.currentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage++;
      this.getBlocks(true);
    }
  }
}
