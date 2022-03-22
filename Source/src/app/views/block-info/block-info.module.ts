import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { BlockInfoRoutingModule } from './block-info-routing.module';

import { BlockInfoComponent } from './block-info.component';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, BlockInfoRoutingModule],
  declarations: [BlockInfoComponent],
  providers: [],
  exports: [BlockInfoComponent],
})
export class BlockInfoModule {}
