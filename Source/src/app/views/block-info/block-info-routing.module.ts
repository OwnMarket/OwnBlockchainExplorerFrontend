import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { BlockInfoComponent } from './block-info.component';

const routes: Routes = [
  {
    path: ':number',
    component: BlockInfoComponent,
    data: { title: extract('Block') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockInfoRoutingModule {}
