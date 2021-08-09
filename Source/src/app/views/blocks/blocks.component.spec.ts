import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlockStoreService } from './block-store.service';

import { BlocksComponent } from './blocks.component';

describe('BlocksComponent', () => {
  let component: BlocksComponent;
  let fixture: ComponentFixture<BlocksComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BlocksComponent],
        imports: [HttpClientTestingModule],
        providers: [BlockStoreService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
