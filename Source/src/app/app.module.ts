import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@app/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './views/home/home.module';
import { HeaderModule } from './shared/components/header/header.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    CoreModule,
    HeaderModule,
    HomeModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
