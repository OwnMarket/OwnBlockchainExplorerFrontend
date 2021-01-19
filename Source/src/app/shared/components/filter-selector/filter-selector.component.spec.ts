import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterSelectorComponent } from './filter-selector.component';

describe('FilterSelectorComponent', () => {
  let component: FilterSelectorComponent;
  let fixture: ComponentFixture<FilterSelectorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FilterSelectorComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
