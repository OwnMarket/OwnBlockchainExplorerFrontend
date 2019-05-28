import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { TableCardComponent } from './table-card/table-card.component';
import { HtmlRenderPipe } from './pipes/html-render.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoaderComponent, SearchInputComponent, TableCardComponent, HtmlRenderPipe],
  exports: [LoaderComponent, SearchInputComponent, TableCardComponent]
})
export class SharedModule {}
