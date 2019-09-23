import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquivocationRoutingModule } from './equivocation-routing.module';
import { EquivocationComponent } from './equivocation.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [EquivocationComponent],
  imports: [CommonModule, TranslateModule, SharedModule, EquivocationRoutingModule]
})
export class EquivocationModule {}
