import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { TransactionInfoRoutingModule } from './transaction-info-routing.module';

import { TransactionInfoComponent } from './transaction-info.component';

@NgModule({
  declarations: [TransactionInfoComponent],
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, TransactionInfoRoutingModule],
  providers: [],
  exports: [TransactionInfoComponent],
})
export class TransactionInfoModule {}
