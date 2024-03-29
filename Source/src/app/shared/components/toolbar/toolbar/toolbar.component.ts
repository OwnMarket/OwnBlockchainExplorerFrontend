import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropdownComponent } from '../../dropdown/dropdown/dropdown.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';
  selectedLanguage: string;
  showUnloadWallet: boolean = false;

  constructor(private translate: TranslateService) {
    const currentLang = localStorage.getItem('selectedLanguage');
    if (currentLang) this.selectedLanguage = currentLang;
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  selectLanguage(language: string) {
    localStorage.setItem('selectedLanguage', language);
    this.selectedLanguage = language;
    this.translate.use(language);
  }

  showUnload(): boolean {
    return !sessionStorage.getItem('hash');
  }

  showUnloadWalletModal(dropdown: DropdownComponent): void {
    this.showUnloadWallet = true;
    dropdown.toggle();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
