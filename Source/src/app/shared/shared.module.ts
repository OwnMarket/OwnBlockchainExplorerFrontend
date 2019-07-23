import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimeagoModule, TimeagoClock } from 'ngx-timeago';

import { LoaderComponent } from './components/loader/loader.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TableCardComponent } from './components/table-card/table-card.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LabeledCardComponent } from './components/labeled-card/labeled-card.component';

import { HtmlRenderPipe } from './pipes/html-render.pipe';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { SearchService } from './services/search.service';
import { CamelCaseToSpace } from './pipes/camelcase-to-space.pipe';
import { CustomClock } from './clock';
import { DisplayTimestampPipe } from './pipes/display-timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    TimeagoModule.forRoot({ clock: { provide: TimeagoClock, useClass: CustomClock } })
  ],
  declarations: [
    LoaderComponent,
    SearchInputComponent,
    TableCardComponent,
    HtmlRenderPipe,
    CamelCaseToSpace,
    PageTitleComponent,
    LabeledCardComponent,
    ScrollEndDirective,
    DisplayTimestampPipe
  ],
  providers: [SearchService],
  exports: [
    LoaderComponent,
    SearchInputComponent,
    TableCardComponent,
    PageTitleComponent,
    LabeledCardComponent,
    TimeagoModule,
    CamelCaseToSpace,
    DisplayTimestampPipe
  ]
})
export class SharedModule {}
