import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'blocks',
    loadChildren: './views/blocks/block.module#BlockModule'
  },
  {
    path: 'block',
    loadChildren: './views/block-info/block-info.module#BlockInfoModule'
  },
  {
    path: 'transactions',
    loadChildren: './views/transactions/transactions.module#TransactionsModule'
  },
  {
    path: 'tx',
    loadChildren: './views/transaction-info/transaction-info.module#TransactionInfoModule'
  },
  {
    path: 'addresses',
    loadChildren: './views/addresses/addresses.module#AddressesModule'
  },
  {
    path: 'address',
    loadChildren: './views/address-info/address-info.module#AddressInfoModule'
  },
  {
    path: 'validators',
    loadChildren: './views/validators/validators.module#ValidatorsModule'
  },
  {
    path: 'equivocation',
    loadChildren: './views/equivocation/equivocation.module#EquivocationModule'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
