import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {
  http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${environment.translationsUrl}/${lang}`).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
