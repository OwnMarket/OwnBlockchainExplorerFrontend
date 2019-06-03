import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';
import { Observable } from 'rxjs';
import { AddressInfoStoreService } from './address-store.service';

const log = new Logger('AdressInfo');
@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit, OnDestroy {
  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;
  currentPage = 1;

  blockchainAddress: string;
  // TODO: make general loader
  isLoading = false;
  canLoadMore = false;
  // TODO: make models
  addressInfo: Observable<any>;

  // Events data set
  events: Observable<any[]>;
  loadingEvents: Observable<boolean>;
  eventColumns: any[];

  // Accounts data set
  accounts: Observable<any[]>;
  loadingAccounts: Observable<boolean>;
  accountColumns: any[];

  // Assets data set
  assets: Observable<any[]>;
  loadingAssets: Observable<boolean>;
  assetColumns: any[];

  // Received stakes data set
  receivedStakes: Observable<any[]>;
  loadingReceivedStakes: Observable<boolean>;
  receivedStakeColumns: any[];

  // Delegated stakes data set
  delegatedStakes: Observable<any[]>;
  loadingDelegatedStakes: Observable<boolean>;
  delegatedStakeColumns: any[];

  constructor(private route: ActivatedRoute, private addressStoreService: AddressInfoStoreService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      log.debug(params);
      this.setupColumns();
      this.blockchainAddress = params.get('address');
      this.addressInfo = this.addressStoreService.addressInfo$.pipe(untilDestroyed(this));

      this.events = this.addressStoreService.events$.pipe(untilDestroyed(this));
      this.loadingEvents = this.addressStoreService.loadingEvents$.pipe(untilDestroyed(this));

      this.receivedStakes = this.addressStoreService.receivedStakes$.pipe(untilDestroyed(this));
      this.loadingReceivedStakes = this.addressStoreService.loadingReceivedStakes$.pipe(untilDestroyed(this));

      this.delegatedStakes = this.addressStoreService.delegatedStakes$.pipe(untilDestroyed(this));
      this.loadingDelegatedStakes = this.addressStoreService.loadingReceivedStakes$.pipe(untilDestroyed(this));

      this.assets = this.addressStoreService.assets$.pipe(untilDestroyed(this));
      this.loadingAssets = this.addressStoreService.loadingAssets$.pipe(untilDestroyed(this));

      this.accounts = this.addressStoreService.accounts$.pipe(untilDestroyed(this));
      this.loadingAccounts = this.addressStoreService.loadingAccounts$.pipe(untilDestroyed(this));

      this.getAddressInfo();
      this.getAddressEvents();
      this.getAddressAccounts();
      this.getAddressAssets();
      this.getAddressDelegatedStakes();
      this.getAddressReceivedStakes();
    });
  }

  ngOnDestroy() {}

  setupColumns() {
    this.eventColumns = [
      {
        name: 'Block number',
        prop: 'blockNumber',
        sortable: false
      },
      {
        name: 'Tx',
        prop: 'transactionHash',
        sortable: false
      },
      {
        name: 'Event info',
        prop: 'eventDetails',
        sortable: false
      },
      {
        name: 'Amount',
        prop: 'amount',
        sortable: false
      },
      {
        name: 'Fee',
        prop: 'amount',
        sortable: false
      }
    ];

    this.accountColumns = [
      {
        name: 'Account Hash',
        prop: 'hash',
        sortable: false
      },
      {
        name: 'Status',
        prop: 'isActive',
        sortable: false
      }
    ];

    this.assetColumns = [
      {
        name: 'Asset Hash',
        prop: 'hash',
        sortable: false
      },
      {
        name: 'Asset code',
        prop: 'assetCode',
        sortable: false
      },
      {
        name: 'Status',
        prop: 'isActive',
        sortable: false
      }
    ];

    this.receivedStakeColumns = [
      {
        name: 'Validator address',
        prop: 'validatorAddress',
        sortable: false
      },
      {
        name: 'Amount',
        prop: 'amount',
        sortable: false
      }
    ];

    this.delegatedStakeColumns = [
      {
        name: 'Staker address',
        prop: 'stakerAddress',
        sortable: false
      },
      {
        name: 'Amount',
        prop: 'amount',
        sortable: false
      }
    ];
  }

  getAddressInfo() {
    if (this.blockchainAddress) {
      this.addressStoreService.getAddressInfo(this.blockchainAddress);
    }
  }

  getAddressAssets() {
    if (this.blockchainAddress) {
      this.addressStoreService.getAssets(this.blockchainAddress);
    }
  }

  getAddressAccounts() {
    if (this.blockchainAddress) {
      this.addressStoreService.getAccounts(this.blockchainAddress);
    }
  }

  getAddressDelegatedStakes() {
    if (this.blockchainAddress) {
      this.addressStoreService.getDelegatedStakes(this.blockchainAddress);
    }
  }

  getAddressReceivedStakes() {
    if (this.blockchainAddress) {
      this.addressStoreService.getReceivedStakes(this.blockchainAddress);
    }
  }

  getAddressEvents() {
    if (this.blockchainAddress) {
      this.addressStoreService.getEvents(this.blockchainAddress);
    }
  }
}
