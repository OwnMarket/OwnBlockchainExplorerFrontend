import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';

@NgModule({
  declarations: [AssetsComponent],
  imports: [CommonModule, SharedModule, AssetsRoutingModule],
  exports: [AssetsComponent]
})
export class AssetsModule {}
