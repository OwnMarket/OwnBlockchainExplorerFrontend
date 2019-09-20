import { Injectable } from '@angular/core';
import { Equivocation } from '@app/core/models/equivocation.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { EquivocationService } from './equivocation.service';

@Injectable({
  providedIn: 'root'
})
export class EquivocationStoreService {
  constructor(private equivocationService: EquivocationService) {}

  private _equivocation = new BehaviorSubject<Equivocation>(null);
  private _loadingEquivocation = new BehaviorSubject<boolean>(false);

  equivocation$: Observable<Equivocation> = this._equivocation.asObservable();
  loadingEquivocation$: Observable<boolean> = this._loadingEquivocation.asObservable();

  get equivocation(): Equivocation {
    return this._equivocation.getValue();
  }

  get loadingEquivocation(): boolean {
    return this._loadingEquivocation.getValue();
  }

  set equivocation(val: Equivocation) {
    this._equivocation.next(val);
  }

  set loadingEquivocation(val: boolean) {
    this._loadingEquivocation.next(val);
  }

  getEquivocation(equivocationProofHash: string) {
    this.loadingEquivocation = true;
    this.equivocationService.getEquivocation(equivocationProofHash).subscribe((resp: any) => {
      this.equivocation = resp.data;
      this.loadingEquivocation = false;
    });
  }
}
