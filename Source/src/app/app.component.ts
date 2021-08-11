import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@env/environment';
import { Logger } from '@app/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routeSub: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.routeSub = this.activatedRoute.queryParams
      .pipe(
        map(params => {
          const lang = params.lang;
          if (lang && environment.supportedLanguages.includes(lang)) {
            localStorage.setItem('selectedLanguage', lang);
            this.translate.use(lang);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}
