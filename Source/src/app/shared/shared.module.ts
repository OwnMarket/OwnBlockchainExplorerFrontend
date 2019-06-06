import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LoaderComponent } from './components/loader/loader.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TableCardComponent } from './components/table-card/table-card.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LabeledCardComponent } from './components/labeled-card/labeled-card.component';

import { HtmlRenderPipe } from './pipes/html-render.pipe';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { SearchService } from './services/search.service';

@NgModule({
  imports: [CommonModule, RouterModule, NgxDatatableModule],
  declarations: [
    LoaderComponent,
    SearchInputComponent,
    TableCardComponent,
    HtmlRenderPipe,
    PageTitleComponent,
    LabeledCardComponent,
    ScrollEndDirective
  ],
  providers: [SearchService],
  exports: [LoaderComponent, SearchInputComponent, TableCardComponent, PageTitleComponent, LabeledCardComponent]
})
export class SharedModule {}
