import { TestBed } from '@angular/core/testing';

import { AddressInfoService } from './address.service';

describe('AddressInfoService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let addressService: AddressInfoService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    addressService = new AddressInfoService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(addressService).toBeTruthy();
  });
});
