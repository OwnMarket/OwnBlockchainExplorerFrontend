import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressesComponent } from './addresses.component';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesService } from './addresses.service';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, CoreModule, SharedModule, AddressesRoutingModule],
  declarations: [AddressesComponent],
  providers: [AddressesService],
  exports: []
})
export class AddressesModule {}
