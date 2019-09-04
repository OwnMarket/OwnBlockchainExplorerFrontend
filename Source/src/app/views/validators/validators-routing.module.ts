import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ValidatorsComponent } from './validators.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'validators',
      component: ValidatorsComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorsRoutingModule {}
