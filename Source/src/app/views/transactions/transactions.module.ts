import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [CommonModule, TranslateModule, SharedModule, TransactionsRoutingModule],
  providers: [],
  exports: [TransactionsComponent]
})
export class TransactionsModule {}
