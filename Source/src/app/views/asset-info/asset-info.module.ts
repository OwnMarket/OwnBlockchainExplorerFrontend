import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { AssetInfoRoutingModule } from './asset-info-routing.module';
import { AssetInfoComponent } from './asset-info.component';

@NgModule({
  declarations: [AssetInfoComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild(), AssetInfoRoutingModule]
})
export class AssetInfoModule {}
