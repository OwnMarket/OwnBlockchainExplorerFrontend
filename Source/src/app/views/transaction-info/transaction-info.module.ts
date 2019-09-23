import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionInfoRoutingModule } from './transaction-info-routing.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionInfoComponent } from './transaction-info.component';

@NgModule({
  declarations: [TransactionInfoComponent],
  imports: [CommonModule, TranslateModule, SharedModule, TransactionInfoRoutingModule],
  providers: [],
  exports: [TransactionInfoComponent]
})
export class TransactionInfoModule {}
