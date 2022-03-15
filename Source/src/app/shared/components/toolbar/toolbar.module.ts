import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoModule } from '../logo/logo.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { IconsModule } from '../icons/icons.module';
import { SearchInputModule } from '../search-input/search-input.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    LogoModule,
    DropdownModule,
    IconsModule,
    SearchInputModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
