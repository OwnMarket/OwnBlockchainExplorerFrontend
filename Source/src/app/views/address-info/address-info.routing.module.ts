import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { AddressInfoComponent } from './address-info.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'address/:address',
      component: AddressInfoComponent,
      data: { title: extract('Address info') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressInfoRoutingModule {}
