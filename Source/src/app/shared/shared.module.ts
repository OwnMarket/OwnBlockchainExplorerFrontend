import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { TableCardComponent } from './table-card/table-card.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { LabeledCardComponent } from './labeled-card/labeled-card.component';
import { HtmlRenderPipe } from './pipes/html-render.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    LoaderComponent,
    SearchInputComponent,
    TableCardComponent,
    HtmlRenderPipe,
    PageTitleComponent,
    LabeledCardComponent
  ],
  exports: [
    LoaderComponent,
    SearchInputComponent,
    TableCardComponent,
    PageTitleComponent,
    LabeledCardComponent
  ]
})
export class SharedModule {}
