import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from '@app/shared/services/search.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchSub: Subscription;

  constructor(private router: Router, private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      hash: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.searchSub && this.searchSub.unsubscribe();
  }

  submit(form: FormGroup): void {
    const {
      valid,
      value: { hash },
    } = form;
    if (valid) this.searchSub = this.searchService.searchByHash(hash).subscribe((type) => this.checkType(type, hash));
  }

  checkType(type: string, hash: string) {
    switch (type) {
      case 'Asset':
        this.router.navigate(['asset', hash]);
        break;
      case 'Account':
        this.router.navigate(['account', hash]);
        break;
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

  blur() {
    if (this.searchForm.get('term')?.value === '') {
      this.searchForm.markAsPristine();
    }
  }

  resetValue(): void {
    this.searchForm.get('hash')?.setValue(null);
  }
}
