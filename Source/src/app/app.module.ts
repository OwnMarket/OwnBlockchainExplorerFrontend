import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './shell/shell.module';

import { HomeModule } from './views/home/home.module';
import { BlockModule } from './views/blocks/block.module';
import { TransactionsModule } from './views/transactions/transactions.module';
import { AddressInfoModule } from './views/address-info/address-info.module';
import { AddressesModule } from './views/addresses/addresses.module';
import { ValidatorsModule } from './views/validators/validators.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    BlockModule,
    TransactionsModule,
    AddressInfoModule,
    AddressesModule,
    ValidatorsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
