import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidatorsComponent } from './validators.component';
import { ValidatorsService } from './validators.service';

describe('ValidatorsComponent', () => {
  let component: ValidatorsComponent;
  let fixture: ComponentFixture<ValidatorsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidatorsComponent],
        imports: [HttpClientTestingModule],
        providers: [ValidatorsService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
