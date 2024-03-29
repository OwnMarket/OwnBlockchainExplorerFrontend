import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BlockStoreService } from '../blocks/block-store.service';

import { BlockInfoComponent } from './block-info.component';

describe('BlockInfoComponent', () => {
  let component: BlockInfoComponent;
  let fixture: ComponentFixture<BlockInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BlockInfoComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [BlockStoreService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
