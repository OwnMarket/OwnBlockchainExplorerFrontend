import { TestBed } from '@angular/core/testing';

import { EquivocationService } from './equivocation.service';

describe('EquivocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquivocationService = TestBed.get(EquivocationService);
    expect(service).toBeTruthy();
  });
});
