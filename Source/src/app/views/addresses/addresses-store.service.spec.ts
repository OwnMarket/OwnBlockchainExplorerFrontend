import { TestBed } from '@angular/core/testing';

import { AddressesStoreService } from './addresses-store.service';

describe('AddressesStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressesStoreService = TestBed.get(AddressesStoreService);
    expect(service).toBeTruthy();
  });
});
