import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared';
import { BlockModule } from '../blocks/block.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    NgxChartsModule,
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule.forChild(),
    SharedModule,
    BlockModule,
    TransactionsModule,
  ],
  providers: [HomeService],
  declarations: [HomeComponent],
})
export class HomeModule {}
