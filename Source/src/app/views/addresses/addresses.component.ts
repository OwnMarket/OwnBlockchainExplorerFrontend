import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressesService } from './addresses.service';
import { AddressStat } from '@app/core/models/address-stat.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  @ViewChild('addKey') addKey: TemplateRef<any>;
  @ViewChild('addValue') addValue: TemplateRef<any>;

  addresses: Observable<AddressStat[]>;
  isLoading: Observable<boolean>;

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
        sortable: true,
        cellTemplate: this.addKey
      },
      {
        name: 'Total Balance',
        prop: 'value',
        sortable: true,
        maxWidth: 150,
        cellTemplate: this.addValue
      }
    ];

    this.getAddresses();
  }

  getAddresses(shouldAppend: boolean = false) {
    this.isLoading = of(true);
    this.addresses = this.service.getAddresses(this.currentPage, this.pageLimit, shouldAppend).pipe(
      map(resp => {
        if (resp.data) {
          this.isLoading = of(false);
          return resp.data;
        }
      })
    );
  }
}
