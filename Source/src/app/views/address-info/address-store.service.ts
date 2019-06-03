import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressInfoService } from './address.service';

@Injectable({ providedIn: 'root' })
export class AddressInfoStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _addressInfo = new BehaviorSubject<any>({});
  private readonly _accounts = new BehaviorSubject<any[]>([]);
  private readonly _loadingAccounts = new BehaviorSubject<boolean>(false);
  private readonly _assets = new BehaviorSubject<any[]>([]);
  private readonly _loadingAssets = new BehaviorSubject<boolean>(false);
  private readonly _delegatedStakes = new BehaviorSubject<any[]>([]);
  private readonly _loadingDelegatedStakes = new BehaviorSubject<boolean>(false);
  private readonly _receivedStakes = new BehaviorSubject<any[]>([]);
  private readonly _loadingReceivedStakes = new BehaviorSubject<boolean>(false);
  private readonly _events = new BehaviorSubject<any[]>([]);
  private readonly _loadingEvents = new BehaviorSubject<boolean>(false);

  // TODO: LOADING INDICATOR AS ARRAY FOR EACH ACTION

  // Expose the observable$ part of the _blocks subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly addressInfo$ = this._addressInfo.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly accounts$ = this._accounts.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingAccounts$ = this._loadingAccounts.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly assets$ = this._assets.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingAssets$ = this._loadingAssets.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly delegatedStakes$ = this._delegatedStakes.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingDelegatedStakes$ = this._loadingDelegatedStakes.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly receivedStakes$ = this._receivedStakes.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingReceivedStakes$ = this._loadingReceivedStakes.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly events$ = this._events.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingEvents$ = this._loadingEvents.asObservable();

  constructor(private addressService: AddressInfoService) {}

  // the getter will return the last value emitted in _blocks subject
  get addressInfo(): any {
    return this._addressInfo.getValue();
  }

  get accounts(): any[] {
    return this._accounts.getValue();
  }

  get assets(): any[] {
    return this._assets.getValue();
  }

  get delegatedStakes(): any[] {
    return this._delegatedStakes.getValue();
  }

  get receivedStakes(): any[] {
    return this._receivedStakes.getValue();
  }

  get events(): any[] {
    return this._events.getValue();
  }

  // assigning a value to this.blocks will push it onto the observable
  // and down to all of its subsribers (ex: this.blocks = [])
  set addressInfo(val: any) {
    this._addressInfo.next(val);
  }

  set accounts(val: any[]) {
    this._accounts.next(val);
  }

  set loadingAccounts(val: boolean) {
    this._loadingAccounts.next(val);
  }

  set assets(val: any[]) {
    this._assets.next(val);
  }

  set loadingAssets(val: boolean) {
    this._loadingAssets.next(val);
  }

  set delegatedStakes(val: any[]) {
    this._delegatedStakes.next(val);
  }

  set loadingDelegatedStakes(val: boolean) {
    this._loadingDelegatedStakes.next(val);
  }

  set receivedStakes(val: any[]) {
    this._receivedStakes.next(val);
  }

  set loadingReceivedStakes(val: boolean) {
    this._loadingReceivedStakes.next(val);
  }

  set events(val: any[]) {
    this._events.next(val);
  }

  set loadingEvents(val: boolean) {
    this._loadingEvents.next(val);
  }

  getAddressInfo(blockchainAddress: string) {
    this.addressService.getAddressInfo(blockchainAddress).subscribe(res => {
      console.log(res);
      this.addressInfo = res;
    });
  }

  getAccounts(blockchainAddress: string) {
    this.loadingAccounts = true;
    this.addressService.getAddressAccounts(blockchainAddress).subscribe(res => {
      this.accounts = res;
      this.loadingAccounts = false;
    });
  }

  getAssets(blockchainAddress: string) {
    this.loadingAssets = true;
    this.addressService.getAddressAssets(blockchainAddress).subscribe(res => {
      this.accounts = res;
      this.loadingAssets = false;
    });
  }

  getDelegatedStakes(blockchainAddress: string) {
    this.loadingDelegatedStakes = true;
    this.addressService.getAddressDelegatedStakes(blockchainAddress).subscribe(res => {
      this.delegatedStakes = res;
      this.loadingDelegatedStakes = false;
    });
  }

  getReceivedStakes(blockchainAddress: string) {
    this.loadingReceivedStakes = true;
    this.addressService.getAddressReceivedStakes(blockchainAddress).subscribe(res => {
      this.receivedStakes = res;
      this.loadingReceivedStakes = false;
    });
  }

  getEvents(blockchainAddress: string) {
    this.loadingEvents = true;
    this.addressService.getAddressEvents(blockchainAddress).subscribe(res => {
      this.receivedStakes = res;
      this.loadingEvents = false;
    });
  }
}
