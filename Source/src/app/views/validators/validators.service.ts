import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/core/models/api-response.model';
import { ValidatorStat } from '@app/core/models/validator-stat.model';
import { ValidatorGeo } from '@app/core/models/validator-geo.model';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor(private http: HttpClient) {}

  getValidatorStats(numberOfDays: number = 7): Observable<ApiResponse<ValidatorStat>> {
    return this.http.get<ApiResponse<ValidatorStat>>(`/stats/validators?numberOfDays=${numberOfDays}`);
  }

  fetchValidatorGeo(): Observable<ApiResponse<ValidatorGeo>> {
    return this.http.get<ApiResponse<ValidatorGeo>>('/validators-geo');
  }
}
