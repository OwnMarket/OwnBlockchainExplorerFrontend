import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed, Logger } from '@app/core';
import { Observable } from 'rxjs';
import { SearchStoreService } from '@app/shared/services/search-store.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('App');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuHidden = true;
  searchField: FormControl = new FormControl();
  searchResult: Observable<{}>;
  isLoading: Observable<boolean>;
  selectedLanguage: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private searchStoreService: SearchStoreService
  ) {}

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    if (!this.selectedLanguage) {
      this.selectedLanguage = 'en';
    }
    this.searchStoreService.searchResult$.pipe(untilDestroyed(this)).subscribe((type: string) => {
      this.checkType(type, this.searchField.value);
    });
    this.isLoading = this.searchStoreService.loadingSearch$.pipe(untilDestroyed(this));
  }

  selectLanguage(language: string) {
    localStorage.setItem('selectedLanguage', language);
    this.selectedLanguage = language;
    this.translate.use(language);
  }

  ngOnDestroy() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  searchByHash() {
    this.searchStoreService.searchByHash(this.searchField.value);
  }

  checkType(type: string, hash: string) {
    switch (type) {
      case 'Address':
        this.router.navigate(['address', hash]);
        break;
      case 'Transaction':
        this.router.navigate(['tx', hash]);
        break;
      case 'Block':
        this.router.navigate(['block', hash]);
        break;
      default:
        break;
    }
  }
}
