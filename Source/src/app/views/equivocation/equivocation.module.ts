import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquivocationRoutingModule } from './equivocation-routing.module';
import { EquivocationComponent } from './equivocation.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [EquivocationComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, EquivocationRoutingModule]
})
export class EquivocationModule {}
