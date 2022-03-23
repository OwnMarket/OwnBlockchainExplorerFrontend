import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputModule } from '../search-input/search-input.module';

import { NavbarComponent } from './navbar/navbar.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, SearchInputModule, IconsModule, TranslateModule.forChild()],
  exports: [NavbarComponent],
})
export class NavbarModule {}
