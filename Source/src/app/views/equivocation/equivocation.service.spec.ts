import { TestBed } from '@angular/core/testing';
import { EquivocationService } from './equivocation.service';

describe('EquivocationService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let eqService: EquivocationService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    eqService = new EquivocationService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(eqService).toBeTruthy();
  });
});
