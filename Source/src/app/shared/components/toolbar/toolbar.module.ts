import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LogoModule } from '../logo/logo.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { IconsModule } from '../icons/icons.module';
import { NavbarModule } from '../navbar/navbar.module';

import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    LogoModule,
    DropdownModule,
    IconsModule,
    NavbarModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
