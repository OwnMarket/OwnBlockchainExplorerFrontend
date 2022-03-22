import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ValidatorsService } from './validators.service';
import { Observable, of } from 'rxjs';
import { ValidatorStat } from '@app/core/models/validator-stat.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss'],
})
export class ValidatorsComponent implements OnInit {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('txStatus', { static: true }) txStatus: TemplateRef<any>;
  @ViewChild('addKey', { static: true }) addKey: TemplateRef<any>;
  @ViewChild('addValue', { static: true }) addValue: TemplateRef<any>;
  @ViewChild('rewardPerc', { static: true }) rewardPerc: TemplateRef<any>;

  validators: Observable<ValidatorStat[]>;
  isLoading: Observable<boolean>;
  totalValidators: number;
  activeValidators: number;
  totalStakes: number;
  totalDeposits: number;

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
        maxWidth: 50,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.validatorAddress',
        prop: 'fullAddress',
        cellTemplate: this.addKey,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.deposit',
        prop: 'deposit',
        sortable: true,
        maxWidth: 100,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.stake',
        prop: 'totalStake',
        sortable: true,
        maxWidth: 100,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.rewardPercent',
        prop: 'sharedRewardPercent',
        sortable: true,
        cellTemplate: this.rewardPerc,
        maxWidth: 100,
        headerClass: 'text-center',
        cellClass: 'text-center',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.collected',
        prop: 'rewardsCollected',
        sortable: true,
        maxWidth: 120,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.distributed',
        prop: 'rewardsDistributed',
        sortable: true,
        maxWidth: 120,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.blocks',
        prop: 'blocksProposed',
        sortable: true,
        maxWidth: 70,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'TXs',
        prop: 'txsProposed',
        sortable: true,
        maxWidth: 50,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.fetchValidators();
  }

  filterValidators(numberOfDays: number) {
    this.fetchValidators(numberOfDays);
  }

  fetchValidators(numberOfDays: number = 7) {
    this.isLoading = of(true);
    this.validators = this.service.getValidatorStats(numberOfDays).pipe(
      map((resp) => {
        if (resp.data) {
          this.totalValidators = resp.data.length;
          this.activeValidators = resp.data.filter((validator) => validator.isActive === true).length;

          this.totalStakes = Math.floor(
            resp.data
              .map((item: ValidatorStat) => item.totalStake)
              .reduce((total: number, current: number) => total + current, 0)
          );

          this.totalDeposits = Math.floor(
            resp.data
              .map((item: ValidatorStat) => item.deposit)
              .reduce((total: number, current: number) => total + current, 0)
          );

          this.isLoading = of(false);
          resp.data.forEach((item: ValidatorStat) => {
            item.fullAddress = {
              blockchainAddress: item.blockchainAddress,
              networkAddress: item.networkAddress,
            };

            item.totalStake = Math.floor(item.totalStake);
          });

          return resp.data.sort((a: ValidatorStat, b: ValidatorStat) => b.blocksProposed - a.blocksProposed);
        }
      })
    );
  }

  getRowClass(row: any) {
    return {
      'row-warning': row.blocksProposed === 0 && row.isActive,
    };
  }
}
