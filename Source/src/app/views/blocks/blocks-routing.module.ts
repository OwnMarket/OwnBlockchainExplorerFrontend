import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { BlocksComponent } from './blocks.component';
import { BlockInfoComponent } from './block-info/block-info.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'blocks', component: BlocksComponent, data: { title: extract('Blocks') } }]),
  Shell.childRoutes([{ path: 'block/:number', component: BlockInfoComponent, data: { title: extract('BlockInfo') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlocksRoutingModule {}
