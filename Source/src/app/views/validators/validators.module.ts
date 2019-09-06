import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ValidatorsRoutingModule } from './validators-routing.module';
import { ValidatorsComponent } from './validators.component';
import { SharedModule } from '@app/shared';
import { ValidatorsMapComponent } from './validators-map/validators-map.component';

@NgModule({
  declarations: [ValidatorsComponent, ValidatorsMapComponent],
  imports: [CommonModule, SharedModule, LeafletModule.forRoot(), ValidatorsRoutingModule]
})
export class ValidatorsModule {}
