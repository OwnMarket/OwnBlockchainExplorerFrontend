import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DropdownItemDirective } from './dropdown-item.directive';

@NgModule({
  declarations: [DropdownComponent, DropdownTriggerDirective, DropdownItemDirective],
  imports: [CommonModule],
  exports: [DropdownComponent]
})
export class DropdownModule {}
