import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksComponent } from './blocks.component';
import { BlockService } from './block.service';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BlockInfoComponent } from './block-info/block-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, CoreModule, SharedModule, BlocksRoutingModule],
  declarations: [BlocksComponent, BlockInfoComponent],
  providers: [BlockService],
  exports: [BlocksComponent]
})
export class BlockModule {}
