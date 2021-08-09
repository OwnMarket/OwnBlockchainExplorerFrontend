import { TestBed } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let validatorsService: ValidatorsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    validatorsService = new ValidatorsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(validatorsService).toBeTruthy();
  });
});
