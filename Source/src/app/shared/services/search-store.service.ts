import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from './search.service';

@Injectable({ providedIn: 'root' })
export class SearchStoreService {
  // - Create one BehaviorSubject per store entity,
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _searchResult = new BehaviorSubject<{}>({});
  private readonly _loadingSearch = new BehaviorSubject<boolean>(false);

  // Expose the observable$ part of the _transactions subject (read only stream)
  // tslint:disable-next-line: member-ordering
  readonly searchResult$ = this._searchResult.asObservable();
  // tslint:disable-next-line: member-ordering
  readonly loadingSearch$ = this._loadingSearch.asObservable();

  constructor(private searchService: SearchService, private toastr: ToastrService) {}

  // the getter will return the last value emitted in _transactions subject
  get searchResult(): any {
    return this._searchResult.getValue();
  }

  set searchResult(val: any) {
    this._searchResult.next(val);
  }

  set loadingSearch(val: boolean) {
    this._loadingSearch.next(val);
  }

  searchByHash(hash: string) {
    this.loadingSearch = true;
    this.searchService.searchByHash(hash).subscribe(
      res => {
        this.searchResult = res;
        this.loadingSearch = false;
      },
      err => {
        this.toastr.error(err.error.alerts[0].message);
      }
    );
  }
}
