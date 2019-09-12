import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ValidatorsService } from './validators.service';
import { Observable, of } from 'rxjs';
import { ValidatorStat } from '@app/core/models/validator-stat.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss']
})
export class ValidatorsComponent implements OnInit {
  @ViewChild('addKey') addKey: TemplateRef<any>;
  @ViewChild('addValue') addValue: TemplateRef<any>;

  validators: Observable<ValidatorStat[]>;
  isLoading: Observable<boolean>;
  totalValidators: number;
  totalStakes: number;
  totalDeposits: number;
  info: string;

  // table config
  tableHeight = '600px';
  columns: any[];

  constructor(private service: ValidatorsService) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'Blockchain Address',
        prop: 'blockchainAddress',
        sortable: true,
        cellTemplate: this.addKey
      },
      {
        name: 'Network Address',
        prop: 'networkAddress',
        sortable: true,
        cellTemplate: this.addValue
      },
      {
        name: 'Deposit',
        prop: 'deposit',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 70
      },
      {
        name: 'Stake',
        prop: 'totalStake',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 70
      },
      {
        name: 'Reward %',
        prop: 'sharedRewardPercent',
        sortable: true,
        maxWidth: 100
      },
      {
        name: 'Collected*',
        prop: 'rewardsCollected',
        sortable: true,
        maxWidth: 100
      },
      {
        name: 'Distributed*',
        prop: 'rewardsDistributed',
        sortable: true,
        maxWidth: 100
      },
      {
        name: 'Blocks*',
        prop: 'blocksProposed',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 70
      },
      {
        name: 'TXs*',
        prop: 'txsProposed',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 50
      }
    ];

    this.isLoading = of(true);
    this.validators = this.service.getValidatorStats().pipe(
      map(resp => {
        if (resp.data) {
          this.totalValidators = resp.data.length;

          this.totalStakes = resp.data
            .map((item: ValidatorStat) => item.totalStake)
            .reduce((total: number, current: number) => total + current, 0);

          this.totalDeposits = resp.data
            .map((item: ValidatorStat) => item.deposit)
            .reduce((total: number, current: number) => total + current, 0);

          this.info = `
          <strong>${this.totalValidators}</strong> validators have 
          <strong>${this.totalStakes}</strong> CHX at stake and 
          <strong>${this.totalDeposits}</strong> CHX locked in deposits.`;

          this.isLoading = of(false);
          return resp.data.sort((a: ValidatorStat, b: ValidatorStat) => a.totalStake - b.totalStake);
        }
      })
    );
  }
}
