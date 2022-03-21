import { Component, OnInit, ViewChild, TemplateRef, Input, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddressStat } from '@app/core/models/address-stat.model';
import { AddressesStoreService } from './addresses-store.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('addKey', { static: true }) addKey: TemplateRef<any>;
  @ViewChild('addValue', { static: true }) addValue: TemplateRef<any>;

  addresses: Observable<AddressStat[]>;
  isLoading: Observable<boolean>;
  canLoad: Observable<boolean>;
  addressCount: Observable<number>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  columns: any[];

  constructor(private addressesStoreService: AddressesStoreService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'explorer.address',
        prop: 'blockchainAddress',
        sortable: true,
        cellTemplate: this.addKey,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.balance',
        prop: 'totalBalance',
        sortable: true,
        maxWidth: 150,
        cellTemplate: this.addValue,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.addresses = this.addressesStoreService.addresses$.pipe(untilDestroyed(this));
    this.isLoading = this.addressesStoreService.loadingAddresses$.pipe(untilDestroyed(this));
    this.canLoad = this.addressesStoreService.canLoadMore$.pipe(untilDestroyed(this));
    this.addressCount = this.addressesStoreService.totalAddresses$.pipe(untilDestroyed(this));
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
