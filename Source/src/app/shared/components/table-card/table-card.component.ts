import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from '@app/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

const log = new Logger('Table-Card');
@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    this.tableHeight = '500px';

    if (!this.loading && this.source) {
      if (this.source.length === 0) {
        this.tableHeight = '25px';
      } else if (this.source.length < 10) {
      } else if (this.source.length > 0 && this.showAll) {
        this.tableHeight = value.length * this.rowHeight + 100 + 'px';
      }
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
