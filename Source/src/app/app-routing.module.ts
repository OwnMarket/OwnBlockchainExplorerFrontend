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
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'blocks',
    loadChildren: () => import('./views/blocks/block.module').then(m => m.BlockModule)
  },
  {
    path: 'block',
    loadChildren: () => import('./views/block-info/block-info.module').then(m => m.BlockInfoModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./views/transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: 'tx',
    loadChildren: () => import('./views/transaction-info/transaction-info.module').then(m => m.TransactionInfoModule)
  },
  {
    path: 'addresses',
    loadChildren: () => import('./views/addresses/addresses.module').then(m => m.AddressesModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./views/address-info/address-info.module').then(m => m.AddressInfoModule)
  },
  {
    path: 'validators',
    loadChildren: () => import('./views/validators/validators.module').then(m => m.ValidatorsModule)
  },
  {
    path: 'equivocation',
    loadChildren: () => import('./views/equivocation/equivocation.module').then(m => m.EquivocationModule)
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
