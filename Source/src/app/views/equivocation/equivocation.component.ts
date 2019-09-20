import { Component, OnInit, OnDestroy } from '@angular/core';
import { EquivocationStoreService } from './equivocation-store.service';
import { Observable, Subscription } from 'rxjs';
import { Equivocation } from '@app/core/models/equivocation.model';
import { untilDestroyed } from '@app/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-equivocation',
  templateUrl: './equivocation.component.html',
  styleUrls: ['./equivocation.component.scss']
})
export class EquivocationComponent implements OnInit, OnDestroy {
  equivocation$: Observable<Equivocation>;
  loading$: Observable<boolean>;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private equivocationStoreService: EquivocationStoreService) {}

  ngOnInit() {
    this.subscription = this.route.paramMap
      .pipe(
        map((params: Params) => {
          this.equivocation$ = this.equivocationStoreService.equivocation$.pipe(untilDestroyed(this));
          this.loading$ = this.equivocationStoreService.loadingEquivocation$.pipe(untilDestroyed(this));
          this.getEquivocation(params.get('hash'));
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEquivocation(equivocationHash: string) {
    this.equivocationStoreService.getEquivocation(equivocationHash);
  }
}
