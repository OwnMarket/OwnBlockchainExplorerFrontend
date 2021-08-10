import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { translationFactory } from './translation.factory';

export function appFactory(http: HttpClient, translate: TranslateService): () => Promise<any> {
  return async (): Promise<any> => {
    return new Promise<void>((resolve, reject) => {
      try {
        const appDeps: Promise<any>[] = [];
        appDeps.push(translationFactory(translate));
        resolve();
        return Promise.all(appDeps);
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  };
}
