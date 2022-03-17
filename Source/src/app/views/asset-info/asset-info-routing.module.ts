import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetInfoComponent } from './asset-info.component';

const routes: Routes = [
  {
    path: ':hash',
    component: AssetInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetInfoRoutingModule {}
