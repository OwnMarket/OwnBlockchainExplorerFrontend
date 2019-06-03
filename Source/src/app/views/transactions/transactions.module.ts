import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionService } from './transaction.service';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

@NgModule({
  declarations: [TransactionsComponent, TransactionInfoComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, TransactionsRoutingModule],
  providers: [TransactionService],
  exports: [TransactionsComponent]
})
export class TransactionsModule {}
