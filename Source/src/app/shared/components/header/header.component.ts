import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SearchStoreService } from '@app/shared/services/search-store.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuHidden = true;
  searchField: FormControl = new FormControl();
  searchResult: Observable<{}>;
  selectedLanguage: string;
  languageSub: Subscription;

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

    this.languageSub = this.translate.onLangChange.subscribe(event => {
      this.selectedLanguage = event.lang;
    });
  }

  selectLanguage(language: string) {
    localStorage.setItem('selectedLanguage', language);
    this.selectedLanguage = language;
    this.translate.use(language);
  }

  ngOnDestroy() {
    if (this.languageSub) this.languageSub.unsubscribe();
  }

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
