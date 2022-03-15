import { BrowserModule } from '@angular/platform-browser';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from '@app/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './views/home/home.module';
import { HeaderModule } from './shared/components/header/header.module';

import { TranslationLoaderService } from './core/services/translation-loader.service';
import { environment } from '@env/environment';
import { appFactory } from './core/factories/app.factory';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ToolbarModule } from './shared/components';
registerLocaleData(localeDe, 'de');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationLoaderService,
        deps: [HttpBackend]
      }
    }),
    ToastrModule.forRoot(),
    ToolbarModule,
    CoreModule,
    HeaderModule,
    HomeModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient, TranslateService],
      useFactory: appFactory
    },
    {
      provide: LOCALE_ID,
      deps: [TranslateService],
      useFactory: (translate: TranslateService) => {
        const lang = localStorage.getItem('selectedLanguage');
        return lang ? lang : environment.defaultLanguage;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
