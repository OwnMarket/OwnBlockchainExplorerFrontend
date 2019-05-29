import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TableCardComponent implements OnInit {
  expanded = true;
  lodash = _;

  // Inputs
  @Input() title: string;
  @Input() headers: any[];
  @Input() data: any[];
  @Input() expandable = false;
  @Input() defaultExpand: any;
  // TODO Need to find better way for filters handler
  @Input() filters: any[];
  @Input() filterable = false;
  @Input() class = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // TODO Find a way to send immediately boolean values instead strings
    this.expanded = this.defaultExpand !== 'false';
  }

  // TODO Use url model
  navigate(url: any) {
    this.router.navigate([url.route, this.generateRouteParams(url)]);
  }

  expand() {
    this.expanded = !this.expanded;
  }

  // TODO: Use url model
  private generateRouteParams(url: any): string {
    return url.params.join(',');
  }
}
