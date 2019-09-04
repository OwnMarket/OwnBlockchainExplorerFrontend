import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidatorsRoutingModule } from './validators-routing.module';
import { ValidatorsComponent } from './validators.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [ValidatorsComponent],
  imports: [CommonModule, SharedModule, ValidatorsRoutingModule]
})
export class ValidatorsModule {}
