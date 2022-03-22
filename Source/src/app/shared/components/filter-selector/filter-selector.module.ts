import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { IconsModule } from '../icons/icons.module';

import { FilterSelectorComponent } from './filter-selector.component';

@NgModule({
  imports: [CommonModule, SharedModule, DropdownModule, IconsModule],
  exports: [FilterSelectorComponent],
  declarations: [FilterSelectorComponent],
  providers: [],
})
export class FilterSelectorModule {}
