import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddressStat } from '@app/core/models/address-stat.model';
import { AddressesService } from './addresses.service';

@Injectable({
  providedIn: 'root'
})
export class AddressesStoreService {
  private readonly _addresses = new BehaviorSubject<AddressStat[]>([]);
  private readonly _loadingAddresses = new BehaviorSubject<boolean>(false);

  // tslint:disable-next-line: member-ordering
  readonly addresses$ = this._addresses.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingAddresses$ = this._loadingAddresses.asObservable();

  constructor(private service: AddressesService) {}

  get addresses(): AddressStat[] {
    return this._addresses.getValue();
  }

  get loadingAddresses(): boolean {
    return this._loadingAddresses.getValue();
  }

  set addresses(value: AddressStat[]) {
    this._addresses.next(value);
  }

  set loadingAddresses(value: boolean) {
    this._loadingAddresses.next(value);
  }

  set appendAddresses(value: AddressStat[]) {
    this._addresses.next([...this.addresses, ...value]);
  }

  getAddresses(page: number, limit: number, shouldAppend: boolean = false) {
    this.loadingAddresses = true;
    this.service.getAddresses(page, limit).subscribe(res => {
      if (res.data.length > 0) {
        if (shouldAppend) {
          this.appendAddresses = res.data;
        } else {
          this.addresses = res.data;
        }
        this.loadingAddresses = false;
      }
    });
  }
}
