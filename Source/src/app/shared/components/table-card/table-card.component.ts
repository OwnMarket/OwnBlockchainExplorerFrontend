import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from '@app/core';

const log = new Logger('Table-Card');
@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
  encapsulation: ViewEncapsulation.None
})
export class TableCardComponent implements OnInit {
  expanded = true;
  lodash = _;
  expandedRow: any = {};

  activeFilter: string = 'current';
  // Inputs
  @Input() title: string;
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
  // @Input() source: any[];
  source: any[];
  @Input('source') set _source(value: any[]) {
    if (!this.loading) {
      if (value.length == 0) {
        this.tableHeight = '25px';
      } else if (value.length < 10) {
        this.tableHeight = value.length * 50 + 100 + 'px';
      } else {
        this.tableHeight = '500px';
      }
      this.source = value;
    }
  }

  // TODO Need to find better way for filters handler
  @Input() filters: any[];
  @Input() filterable = false;
  @Input() class = '';

  @Output() loadMore: EventEmitter<boolean> = new EventEmitter();
  @Output() expandClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() filter: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private el: ElementRef) {}

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
