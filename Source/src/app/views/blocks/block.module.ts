import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksComponent } from './blocks.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, BlocksRoutingModule],
  declarations: [BlocksComponent],
  providers: [],
  exports: [BlocksComponent]
})
export class BlockModule {}
