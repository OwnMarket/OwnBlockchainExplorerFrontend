import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledCardComponent } from './labeled-card.component';

describe('LabeledCardComponent', () => {
  let component: LabeledCardComponent;
  let fixture: ComponentFixture<LabeledCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
