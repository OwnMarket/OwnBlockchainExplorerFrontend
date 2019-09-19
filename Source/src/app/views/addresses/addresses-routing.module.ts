import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { AddressesComponent } from './addresses.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'addresses',
      component: AddressesComponent,
      data: { title: extract('Addresses') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddressesRoutingModule {}
