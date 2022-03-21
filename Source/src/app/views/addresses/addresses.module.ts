import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared';
import { AddressesComponent } from './addresses.component';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesService } from './addresses.service';

@NgModule({
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, AddressesRoutingModule],
  declarations: [AddressesComponent],
  providers: [AddressesService],
  exports: [],
})
export class AddressesModule {}
