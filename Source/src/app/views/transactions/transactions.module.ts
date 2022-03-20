import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [CommonModule, TranslateModule.forChild(), SharedModule, TransactionsRoutingModule],
  providers: [],
  exports: [TransactionsComponent],
})
export class TransactionsModule {}
