import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BlockModule } from '../blocks/block.module';
import { TransactionsModule } from '../transactions/transactions.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    NgxChartsModule,
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    BlockModule,
    TransactionsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
