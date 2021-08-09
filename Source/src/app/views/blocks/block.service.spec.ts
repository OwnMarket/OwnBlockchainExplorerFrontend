import { TestBed } from '@angular/core/testing';
import { ApiResponse } from '@app/core/models/api-response.model';
import { BlockItem } from '@app/core/models/block-item.model';
import { defer } from 'rxjs';
import { BlockService, PageLimitContext } from './block.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('BlockService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let blockService: BlockService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    blockService = new BlockService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(blockService).toBeTruthy();
  });

  it('getBlocks() should return list of blocks as data', (done: DoneFn) => {
    const context: PageLimitContext = { page: 1, limit: 20 };
    const expectedResult: ApiResponse<BlockItem[]> = {
      data: [
        { blockNumber: 2342662, hash: '8wVuy5rjPsqMvx47wzDKZSJXHtvJVavomJQZrb5tC4ex', timestamp: '2021-08-09T15:13:27' }
      ],
      successful: true,
      alerts: []
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedResult));

    blockService.getBlocks(context).subscribe(resp => {
      expect(resp).toEqual(expectedResult.data, 'expected result');
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
