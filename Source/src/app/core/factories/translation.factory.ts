import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';

export async function translationFactory(translate: TranslateService) {
  try {
    const supportedLanguages = environment.supportedLanguages;
    translate.addLangs(supportedLanguages);
    translate.setDefaultLang(environment.defaultLanguage);

    let selectedLanguage = localStorage.getItem('selectedLanguage');

    if (!selectedLanguage) {
      const browserLanguage = translate.getBrowserLang();
      supportedLanguages.includes(browserLanguage) ? (selectedLanguage = browserLanguage) : environment.defaultLanguage;
    }

    if (selectedLanguage) {
      localStorage.setItem('selectedLanguage', selectedLanguage);
      translate.use(selectedLanguage);
    }

    return new Promise<void>(resolve => {
      translate.onLangChange.subscribe(() => {
        resolve();
      });
    });
  } catch (e) {
    console.log('Error initializing translations:', e);
  }
}
