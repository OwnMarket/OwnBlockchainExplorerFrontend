import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EquivocationStoreService } from './equivocation-store.service';

import { EquivocationComponent } from './equivocation.component';

describe('EquivocationComponent', () => {
  let component: EquivocationComponent;
  let fixture: ComponentFixture<EquivocationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EquivocationComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [EquivocationStoreService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EquivocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
