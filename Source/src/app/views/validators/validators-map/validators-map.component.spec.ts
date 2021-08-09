import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValidatorsService } from '../validators.service';

import { ValidatorsMapComponent } from './validators-map.component';

describe('ValidatorsMapComponent', () => {
  let component: ValidatorsMapComponent;
  let fixture: ComponentFixture<ValidatorsMapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidatorsMapComponent],
        imports: [HttpClientTestingModule],
        providers: [ValidatorsService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
