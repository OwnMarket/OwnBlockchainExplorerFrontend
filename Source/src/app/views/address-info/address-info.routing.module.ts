import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AddressInfoComponent } from './address-info.component';

const routes: Routes = [
  {
    path: ':address',
    component: AddressInfoComponent,
    data: { title: extract('Address') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressInfoRoutingModule {}
