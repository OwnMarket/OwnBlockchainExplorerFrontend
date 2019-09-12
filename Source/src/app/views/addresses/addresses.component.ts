import { Component, OnInit, ViewChild, TemplateRef, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressStat } from '@app/core/models/address-stat.model';
import { AddressesStoreService } from './addresses-store.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  @ViewChild('addKey') addKey: TemplateRef<any>;
  @ViewChild('addValue') addValue: TemplateRef<any>;

  addresses: Observable<AddressStat[]>;
  isLoading: Observable<boolean>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private addressesStoreService: AddressesStoreService) {}

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

    this.addresses = this.addressesStoreService.addresses$.pipe(untilDestroyed(this));
    this.isLoading = this.addressesStoreService.loadingAddresses$.pipe(untilDestroyed(this));
    this.getAddresses();
  }

  ngOnDestroy(): void {}

  getAddresses(shouldAppend: boolean = false) {
    this.addressesStoreService.getAddresses(this.currentPage, this.pageLimit, shouldAppend);
  }

  onLoadMore(event: any) {
    this.currentPage++;
    this.getAddresses(true);
  }
}
