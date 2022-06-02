import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableCardComponent implements OnInit {
  expanded = true;
  expandedRow: any = {};

  activeFilter = 'current';
  // Inputs
  @Input() title: string;
  @Input() info: string;
  @Input() expandable = false;
  @Input() isTransparent = false;
  @Input() set defaultExpand(value: boolean) {
    this.expanded = value;
  }
  @Input() headerHeight = 50;
  @Input() rowHeight = 50;
  @Input() tableHeight = '500px';
  @Input() pageLimit = 10;
  @Input() loading: boolean;
  @Input() canLoadMore = true;
  @Input() columns: any[];
  @Input() stakes: number;
  @Input() showAll = false;
  @Input() scrollH = false;
  @Input() rowClass = () => {};

  source: any[] = [];
  @Input('source') set _source(value: any[]) {
    if (value) {
      this.source = value;
      this.source = [...this.source];
    }

    setTimeout(() => {
      if (!this.loading && this.source) {
        if (this.source.length === 0) {
          this.tableHeight = '25px';
        }
        if (this.showAll) {
          this.tableHeight = this.source.length * this.rowHeight + 50 + 'px';
        }
      }
    }, 0);
  }

  // TODO Need to find better way for filters handler
  @Input() filters: any[];
  @Input() filterable = false;
  @Input() class = '';

  @Output() loadMore: EventEmitter<boolean> = new EventEmitter();
  @Output() expandClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() filter: EventEmitter<boolean> = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.onScroll(0);
  }

  onScroll(offsetY: number) {
    if (this.canLoadMore) {
      // total height of all rows in the viewport
      const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

      // check if we scrolled to the end of the viewport
      if (!this.loading && offsetY + viewHeight >= this.source.length * this.rowHeight) {
        this.loadMore.emit(true);
      }
    }
  }

  expand() {
    this.expanded = !this.expanded;
    this.expandClicked.emit(this.expanded);
  }

  onFilter(filter: string) {
    this.activeFilter = filter;
    this.filter.emit(this.activeFilter === 'current');
  }
}
