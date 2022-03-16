import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '@app/shared';
import { DropdownModule, IconsModule } from '@app/shared/components';

import { ValidatorsRoutingModule } from './validators-routing.module';
import { ValidatorsComponent } from './validators.component';
import { ValidatorsMapComponent } from './validators-map/validators-map.component';
import { ValidatorTimeFilterComponent } from './validator-time-filter/validator-time-filter.component';

@NgModule({
  declarations: [ValidatorsComponent, ValidatorsMapComponent, ValidatorTimeFilterComponent],
  imports: [CommonModule, SharedModule, LeafletModule.forRoot(), DropdownModule, IconsModule, ValidatorsRoutingModule]
})
export class ValidatorsModule {}
