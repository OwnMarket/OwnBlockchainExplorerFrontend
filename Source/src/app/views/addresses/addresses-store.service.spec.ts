import { TestBed } from '@angular/core/testing';
import { AddressesStoreService } from './addresses-store.service';
import { AddressesService } from './addresses.service';

describe('AddressesStoreService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let addressesService: AddressesService;
  let astoreService: AddressesStoreService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    addressesService = new AddressesService(httpClientSpy as any);
    astoreService = new AddressesStoreService(addressesService);
  });

  it('should be created', () => {
    expect(astoreService).toBeTruthy();
  });
});
