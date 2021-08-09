import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddressesStoreService } from './addresses-store.service';

import { AddressesComponent } from './addresses.component';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddressesComponent],
        imports: [HttpClientTestingModule],
        providers: [AddressesStoreService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
