import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimeagoModule, TimeagoClock } from 'ngx-timeago';

import { LoaderComponent } from './components/loader/loader.component';
import { TableCardComponent } from './components/table-card/table-card.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { LabeledCardComponent } from './components/labeled-card/labeled-card.component';

import { HtmlRenderPipe } from './pipes/html-render.pipe';
import { ScrollEndDirective } from './directives/scroll-end.directive';
import { SearchService } from './services/search.service';
import { CamelCaseToSpace } from './pipes/camelcase-to-space.pipe';
import { CustomClock } from './clock';
import { DisplayTimestampPipe } from './pipes/display-timestamp.pipe';
import { FilterSelectorComponent } from './components/filter-selector/filter-selector.component';
import { ClickOutDirective } from './directives/click-out.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxDatatableModule,
    TimeagoModule.forRoot({ clock: { provide: TimeagoClock, useClass: CustomClock } })
  ],
  declarations: [
    LoaderComponent,
    TableCardComponent,
    HtmlRenderPipe,
    CamelCaseToSpace,
    PageTitleComponent,
    LabeledCardComponent,
    ScrollEndDirective,
    DisplayTimestampPipe,
    FilterSelectorComponent,
    ClickOutDirective
  ],
  providers: [SearchService],
  exports: [
    LoaderComponent,
    TableCardComponent,
    PageTitleComponent,
    LabeledCardComponent,
    TimeagoModule,
    CamelCaseToSpace,
    DisplayTimestampPipe,
    FilterSelectorComponent,
    ClickOutDirective
  ]
})
export class SharedModule {}
