import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquivocationComponent } from './equivocation.component';
import { extract } from '@app/core';

const routes: Routes = [
  {
    path: ':hash',
    component: EquivocationComponent,
    data: { title: extract('Equivocation Info') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquivocationRoutingModule {}
