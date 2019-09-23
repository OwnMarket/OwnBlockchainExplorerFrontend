import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BlocksRoutingModule } from './blocks-routing.module';
import { BlocksComponent } from './blocks.component';
import { SharedModule } from '@app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, SharedModule, BlocksRoutingModule],
  declarations: [BlocksComponent],
  providers: [],
  exports: [BlocksComponent]
})
export class BlockModule {}
