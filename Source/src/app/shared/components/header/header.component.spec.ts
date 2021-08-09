import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { I18nService } from '@app/core';
import { HeaderComponent } from './header.component';
import { SearchStoreService } from '@app/shared/services/search-store.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot(), ToastrModule.forRoot()],
        declarations: [HeaderComponent],
        providers: [I18nService, SearchStoreService, ToastrService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
