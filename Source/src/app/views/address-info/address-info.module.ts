import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { FilterSelectorModule } from '@app/shared/components';
import { AddressInfoRoutingModule } from './address-info.routing.module';

import { AddressInfoComponent } from './address-info.component';
import { AddressInfoService } from './address.service';

@NgModule({
  declarations: [AddressInfoComponent],
  imports: [CommonModule, TranslateModule, SharedModule, FilterSelectorModule, AddressInfoRoutingModule],
  providers: [AddressInfoService]
})
export class AddressInfoModule {}
