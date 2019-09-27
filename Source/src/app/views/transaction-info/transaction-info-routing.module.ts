import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { TransactionInfoComponent } from './transaction-info.component';

const routes: Routes = [
  {
    path: ':hash',
    component: TransactionInfoComponent,
    data: { title: extract('Transaction') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionInfoRoutingModule {}
