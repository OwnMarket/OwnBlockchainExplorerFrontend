import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, SharedModule, AccountsRoutingModule],
  exports: [AccountsComponent]
})
export class AccountsModule {}
