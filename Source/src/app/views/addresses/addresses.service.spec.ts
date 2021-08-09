import { TestBed } from '@angular/core/testing';
import { AddressesService } from './addresses.service';

describe('AddressesService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let addressService: AddressesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    addressService = new AddressesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(addressService).toBeTruthy();
  });
});
