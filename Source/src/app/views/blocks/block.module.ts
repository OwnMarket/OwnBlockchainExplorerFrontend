import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksComponent } from './blocks.component';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, BlocksRoutingModule],
  declarations: [BlocksComponent],
  providers: [],
  exports: [BlocksComponent],
})
export class BlockModule {}
