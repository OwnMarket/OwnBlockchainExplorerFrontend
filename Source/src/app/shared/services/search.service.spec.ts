import { TestBed } from '@angular/core/testing';
import { ApiResponse } from '@app/core/models/api-response.model';
import { defer } from 'rxjs';
import { SearchService } from './search.service';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SearchService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let searchService: SearchService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    searchService = new SearchService(httpClientSpy as any);
  });

  it('searchByHash() should return Address as data', (done: DoneFn) => {
    const testHash: string = 'CHbVoTPVRVZvEFcxw7ksddLULsdG5cTynFQ';
    const expectedResult: ApiResponse<string> = { data: 'Address', successful: true, alerts: [] };

    httpClientSpy.get.and.returnValue(asyncData(expectedResult));

    searchService.searchByHash(testHash).subscribe(resp => {
      expect(resp).toEqual(expectedResult.data, 'expected result');
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
