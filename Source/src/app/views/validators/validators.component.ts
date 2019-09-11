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
        name: 'Reward %',
        prop: 'sharedRewardPercent',
        sortable: true,
        maxWidth: 70
      },
      {
        name: 'Collected',
        prop: 'rewardsCollected',
        sortable: true,
        maxWidth: 100
      },
      {
        name: 'Distributed',
        prop: 'rewardsDistributed',
        sortable: true,
        maxWidth: 100
      },
      {
        name: 'Total Stake',
        prop: 'totalStake',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 100
      },
      {
        name: 'Deposit',
        prop: 'deposit',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 70
      },
      {
        name: 'Blocks Proposed',
        prop: 'blocksProposed',
        sortable: true,
        cellTemplate: this.addValue,
        maxWidth: 120
      },
      {
        name: 'TXs Proposed',
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

          this.info = `${this.totalValidators} validators have ${this.totalStakes} CHX at stake and ${
            this.totalDeposits
          } CHX locked in deposits.`;

          this.isLoading = of(false);
          return resp.data;
        }
      })
    );
  }
}
