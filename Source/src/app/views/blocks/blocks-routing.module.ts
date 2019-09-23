import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { BlocksComponent } from './blocks.component';

const routes: Routes = [
  {
    path: '',
    component: BlocksComponent,
    data: { title: extract('Blocks') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlocksRoutingModule {}
