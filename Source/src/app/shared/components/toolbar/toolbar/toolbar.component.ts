import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropdownComponent } from '../../dropdown/dropdown/dropdown.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  selectedLanguage: string;
  showUnloadWallet: boolean = false;

  constructor(private translate: TranslateService) {
    const currentLang = localStorage.getItem('selectedLanguage');
    if (currentLang) this.selectedLanguage = currentLang;
  }

  ngOnInit(): void {}

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
}
