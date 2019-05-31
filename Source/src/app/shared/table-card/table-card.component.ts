import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TableCardComponent implements OnInit {
  expanded: boolean = true;
  lodash = _;

  // Inputs
  @Input() title: string;
  @Input() loading = false;
  @Input() headers: any[];
  @Input() data: any[];
  @Input() expandable = false;
  @Input() defaultExpand: any;
  // TODO Need to find better way for filters handler
  @Input() filters: any[];
  @Input() filterable = false;
  @Input() class = '';

  @Output() loadMore: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.data);
    console.log(this.loading);

    // TODO Find a way to send immediately boolean values instead strings
    this.expanded = this.defaultExpand !== 'false';
  }

  // TODO Use url model
  navigate(url: any) {
    console.log(url);
    this.router.navigate([url.route, this.generateRouteParams(url)]);
  }

  expand() {
    this.expanded = !this.expanded;
  }

  endReached(isReached: boolean) {
    console.log(isReached);
    this.loadMore.emit(isReached);
  }

  // TODO: Use url model
  private generateRouteParams(url: any): string {
    return url.params.join(',');
  }
}
