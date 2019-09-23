import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ValidatorsComponent } from './validators.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorsComponent,
    data: { title: extract('Validators') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorsRoutingModule {}
