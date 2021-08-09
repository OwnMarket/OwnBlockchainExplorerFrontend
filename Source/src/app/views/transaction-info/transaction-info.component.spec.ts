import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CryptoService } from '@app/shared/services/crypto.service';
import { TransactionStoreService } from '../transactions/transaction-store.service';

import { TransactionInfoComponent } from './transaction-info.component';

describe('TransactionInfoComponent', () => {
  let component: TransactionInfoComponent;
  let fixture: ComponentFixture<TransactionInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionInfoComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [TransactionStoreService, CryptoService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
