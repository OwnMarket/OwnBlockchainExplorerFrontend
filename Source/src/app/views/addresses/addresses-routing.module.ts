import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AddressesComponent } from './addresses.component';

const routes: Routes = [
  {
    path: '',
    component: AddressesComponent,
    data: { title: extract('Addresses') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddressesRoutingModule {}
