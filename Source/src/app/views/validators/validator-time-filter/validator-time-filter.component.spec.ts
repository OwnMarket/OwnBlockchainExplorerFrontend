import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorTimeFilterComponent } from './validator-time-filter.component';

describe('ValidatorTimeFilterComponent', () => {
  let component: ValidatorTimeFilterComponent;
  let fixture: ComponentFixture<ValidatorTimeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorTimeFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorTimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
