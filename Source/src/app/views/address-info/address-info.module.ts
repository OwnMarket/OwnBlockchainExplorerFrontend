import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressInfoComponent } from './address-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { AddressInfoRoutingModule } from './address-info.routing.module';
import { AddressInfoService } from './address.service';

@NgModule({
  declarations: [AddressInfoComponent],
  imports: [CommonModule, TranslateModule, SharedModule, AddressInfoRoutingModule],
  providers: [AddressInfoService]
})
export class AddressInfoModule {}
