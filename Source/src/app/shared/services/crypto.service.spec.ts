import { CryptoService } from './crypto.service';
import { TestBed } from '@angular/core/testing';

describe('CryptoService', () => {
  let service: CryptoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoService]
    });
    service = TestBed.get(CryptoService);
  });

  it('should be able to create service instance', () => {
    expect(service).toBeDefined();
  });
});
