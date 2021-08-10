import { TestBed } from '@angular/core/testing';
import { TranslationLoaderService } from './translation-loader.service';

describe('TranslationLoaderService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let tlService: TranslationLoaderService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    tlService = new TranslationLoaderService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(tlService).toBeTruthy();
  });
});
