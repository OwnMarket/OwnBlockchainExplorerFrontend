import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  @ViewChild('addKey') addKey: TemplateRef<any>;
  @ViewChild('addValue') addValue: TemplateRef<any>;

  // TODO: make models
  addresses: Observable<any[]>;
  isLoading: Observable<boolean>;

  apiTimer: any;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private service: AddressesService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'Address',
        prop: 'key',
        sortable: false,
        width: 250,
        cellTemplate: this.addKey
      },
      {
        name: 'Total Balance',
        prop: 'value',
        sortable: false,
        cellTemplate: this.addValue
      }
    ];

    this.getAddresses();
  }

  ngOnDestroy() {}

  getAddresses(shouldAppend: boolean = false) {
    this.addresses = this.service.getAddresses(this.currentPage, this.pageLimit, shouldAppend);
  }
}
