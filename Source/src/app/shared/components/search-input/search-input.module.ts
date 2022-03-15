import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IconsModule } from '../icons/icons.module';

import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IconsModule, TranslateModule.forChild()],
  exports: [SearchInputComponent],
  declarations: [SearchInputComponent],
  providers: []
})
export class SearchInputModule {}
