import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsService } from './transactions.service';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';

@NgModule({
  declarations: [TransactionsComponent, TransactionInfoComponent, AddressInfoComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, TransactionsRoutingModule],
  providers: [TransactionsService],
  exports: [TransactionsComponent]
})
export class TransactionsModule {}
