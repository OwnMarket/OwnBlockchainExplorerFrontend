import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BlockInfoRoutingModule } from './block-info-routing.module';
import { BlockInfoComponent } from './block-info.component';
import { SharedModule } from '@app/shared';
@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, BlockInfoRoutingModule],
  declarations: [BlockInfoComponent],
  providers: [],
  exports: [BlockInfoComponent]
})
export class BlockInfoModule {}
