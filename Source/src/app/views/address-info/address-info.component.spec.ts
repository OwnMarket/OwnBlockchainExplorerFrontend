import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddressesStoreService } from '../addresses/addresses-store.service';

import { AddressInfoComponent } from './address-info.component';

describe('AddressInfoComponent', () => {
  let component: AddressInfoComponent;
  let fixture: ComponentFixture<AddressInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddressInfoComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [AddressesStoreService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
