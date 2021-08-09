import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let homeService: HomeService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    homeService = new HomeService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(homeService).toBeTruthy();
  });
});
