import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed, Logger } from '@app/core';
import { Observable } from 'rxjs';
import { SearchStoreService } from '@app/shared/services/search-store.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private searchStoreService: SearchStoreService) {}

  ngOnInit() {
    this.searchStoreService.searchResult$.pipe(untilDestroyed(this)).subscribe((type: string) => {
      this.checkType(type, this.searchField.value);
    });
    this.isLoading = this.searchStoreService.loadingSearch$.pipe(untilDestroyed(this));
  }

  ngOnDestroy() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {}

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
