import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsMapComponent } from './validators-map.component';

describe('ValidatorsMapComponent', () => {
  let component: ValidatorsMapComponent;
  let fixture: ComponentFixture<ValidatorsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorsMapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
