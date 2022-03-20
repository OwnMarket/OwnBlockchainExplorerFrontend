import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, TranslationTerm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  getTranslation(lang: string): Observable<{ [term: string]: string }> {
    return this.http.get(`${environment.localizationUrl}/${lang}?appContext=${environment.appContext}`).pipe(
      map((response: ApiResponse<TranslationTerm[]>) => {
        const translations: { [term: string]: string } = {};
        response.data.forEach(({ term, translation }: TranslationTerm) => {
          translations[term] = translation;
        });
        return translations;
      })
    );
  }
}
