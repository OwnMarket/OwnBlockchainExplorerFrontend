import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { AccountInfoRoutingModule } from './account-info-routing.module';
import { AccountInfoComponent } from './account-info.component';

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, AccountInfoRoutingModule],
  exports: [AccountInfoComponent]
})
export class AccountInfoModule {}
