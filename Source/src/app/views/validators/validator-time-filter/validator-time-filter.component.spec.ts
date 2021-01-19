import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidatorTimeFilterComponent } from './validator-time-filter.component';

describe('ValidatorTimeFilterComponent', () => {
  let component: ValidatorTimeFilterComponent;
  let fixture: ComponentFixture<ValidatorTimeFilterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidatorTimeFilterComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
