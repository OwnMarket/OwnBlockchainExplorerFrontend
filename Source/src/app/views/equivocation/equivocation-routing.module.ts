import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquivocationComponent } from './equivocation.component';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'equivocation/:hash',
      component: EquivocationComponent,
      data: { title: extract('Transactions') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquivocationRoutingModule {}
