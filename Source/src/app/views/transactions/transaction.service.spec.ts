import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let txService: TransactionService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    txService = new TransactionService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(txService).toBeTruthy();
  });
});
