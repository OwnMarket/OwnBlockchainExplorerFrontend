import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Logger, untilDestroyed } from '@app/core';
import { BlockStoreService } from './block-store.service';

const log = new Logger('Blocks');
@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
  @ViewChild('linkBlock') linkBlock: TemplateRef<any>;
  // TODO: make models
  blocks: Observable<any[]>;
  isLoading: Observable<boolean>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private blockStoreService: BlockStoreService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'Block Number',
        prop: 'blockNumber',
        sortable: false,
        maxWidth: 150,
        cellTemplate: this.linkBlock
      },
      {
        name: 'Block hash',
        prop: 'hash',
        sortable: false
      }
    ];

    this.blocks = this.blockStoreService.blocks$.pipe(untilDestroyed(this));
    this.isLoading = this.blockStoreService.loadingBlocks$.pipe(untilDestroyed(this));
    this.getBlocks();
  }
  ngOnDestroy() {}

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
