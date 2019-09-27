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
  @ViewChild('txStatus', { static: true }) txStatus: TemplateRef<any>;
  @ViewChild('addKey', { static: true }) addKey: TemplateRef<any>;
  @ViewChild('addValue', { static: true }) addValue: TemplateRef<any>;
  @ViewChild('rewardPerc', { static: true }) rewardPerc: TemplateRef<any>;

  validators: Observable<ValidatorStat[]>;
  isLoading: Observable<boolean>;
  info: string;

  // table config
  tableHeight = '900px';
  columns: any[];

  constructor(private service: ValidatorsService) {}

  ngOnInit() {
    this.columns = [
      {
        name: '',
        prop: 'isActive',
        sortable: true,
        cellTemplate: this.txStatus,
        maxWidth: 50
      },
      {
        name: 'Validator Address',
        prop: 'fullAddress',
        cellTemplate: this.addKey
      },
      {
        name: 'Deposit',
        prop: 'deposit',
        sortable: true,
        maxWidth: 70
      },
      {
        name: 'Stake',
        prop: 'totalStake',
        sortable: true,
        maxWidth: 150
      },
      {
        name: 'Reward %',
        prop: 'sharedRewardPercent',
        sortable: true,
        cellTemplate: this.rewardPerc,
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
        maxWidth: 70
      },
      {
        name: 'TXs*',
        prop: 'txsProposed',
        sortable: true,
        maxWidth: 50
      }
    ];

    this.isLoading = of(true);

    this.validators = this.service.getValidatorStats().pipe(
      map(resp => {
        if (resp.data) {
          const totalValidators = resp.data.length;
          const activeValidators = resp.data.filter(validator => validator.isActive === true).length;

          const totalStakes = Math.floor(
            resp.data
              .map((item: ValidatorStat) => item.totalStake)
              .reduce((total: number, current: number) => total + current, 0)
          );

          const totalDeposits = Math.floor(
            resp.data
              .map((item: ValidatorStat) => item.deposit)
              .reduce((total: number, current: number) => total + current, 0)
          );

          this.info = `
            <strong>${totalValidators}</strong> validators
            (<strong>${activeValidators}</strong> active) have
            <strong>${totalStakes}</strong> CHX at stake and
            <strong>${totalDeposits}</strong> CHX locked in deposits.
          `;

          this.isLoading = of(false);
          resp.data.forEach((item: ValidatorStat) => {
            item.fullAddress = {
              blockchainAddress: item.blockchainAddress,
              networkAddress: item.networkAddress
            };

            item.totalStake = Math.floor(item.totalStake);
          });

          return resp.data;
        }
      })
    );
  }
}
