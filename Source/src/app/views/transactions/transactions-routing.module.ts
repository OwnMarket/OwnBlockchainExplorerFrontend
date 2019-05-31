import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { TransactionsComponent } from './transactions.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'transactions',
      component: TransactionsComponent,
      data: { title: extract('Transactions') }
    },
    {
      path: 'transaction-info/:hash',
      component: TransactionInfoComponent,
      data: { title: extract('Transaction info') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
