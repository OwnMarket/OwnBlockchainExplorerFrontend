import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquivocationComponent } from './equivocation.component';

describe('EquivocationComponent', () => {
  let component: EquivocationComponent;
  let fixture: ComponentFixture<EquivocationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EquivocationComponent]
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
