import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from '@angular/core';
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
  @ViewChild('addressStatus') addressStatus: TemplateRef<any>;
  @ViewChild('blockLink') blockLink: TemplateRef<any>;
  @ViewChild('txLink') txLink: TemplateRef<any>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;

  currentPage = {
    events: 1,
    accounts: 1,
    assets: 1,
    receivedStakes: 1,
    delegatedStakes: 1
  };

  blockchainAddress: string;

  addressInfo: Observable<any>;
  loadingAddressInfo: Observable<boolean>;

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
      this.loadingAddressInfo = this.addressStoreService.loadingAddressInfo$.pipe(untilDestroyed(this));

      this.events = this.addressStoreService.events$.pipe(untilDestroyed(this));
      this.loadingEvents = this.addressStoreService.loadingEvents$.pipe(untilDestroyed(this));

      this.delegatedStakes = this.addressStoreService.receivedStakes$.pipe(untilDestroyed(this));
      this.loadingDelegatedStakes = this.addressStoreService.loadingReceivedStakes$.pipe(untilDestroyed(this));

      this.receivedStakes = this.addressStoreService.delegatedStakes$.pipe(untilDestroyed(this));
      this.loadingReceivedStakes = this.addressStoreService.loadingReceivedStakes$.pipe(untilDestroyed(this));

      this.assets = this.addressStoreService.assets$.pipe(untilDestroyed(this));
      this.loadingAssets = this.addressStoreService.loadingAssets$.pipe(untilDestroyed(this));

      this.accounts = this.addressStoreService.accounts$.pipe(untilDestroyed(this));
      this.loadingAccounts = this.addressStoreService.loadingAccounts$.pipe(untilDestroyed(this));

      this.getAddressInfo();
      this.getAddressEvents();
      this.getAddressAccounts(false, true);
      this.getAddressAssets(false, true);
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
        sortable: false,
        maxWidth: 150,
        cellTemplate: this.blockLink
      },
      {
        name: 'Tx',
        prop: 'transactionHash',
        sortable: false,
        cellTemplate: this.txLink
      },
      {
        name: 'Event info',
        prop: 'eventDetails',
        sortable: false
      },
      {
        name: 'Amount',
        prop: 'amount',
        sortable: false,
        maxWidth: 250
      },
      {
        name: 'Fee',
        prop: 'fee',
        maxWidth: 150,
        sortable: false
      }
    ];

    this.accountColumns = [
      {
        name: 'Account hash',
        prop: 'hash',
        sortable: false
      },
      {
        name: 'Status',
        prop: 'isActive',
        maxWidth: 150,
        sortable: false,
        cellTemplate: this.addressStatus
      }
    ];

    this.assetColumns = [
      {
        name: 'Asset hash',
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
        maxWidth: 150,
        sortable: false,
        cellTemplate: this.addressStatus
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

  getAddressAssets(shouldAppend: boolean = false, status?: boolean) {
    if (this.blockchainAddress) {
      this.addressStoreService.getAssets(
        this.blockchainAddress,
        this.currentPage.assets,
        this.pageLimit,
        shouldAppend,
        status
      );
    }
  }

  onLoadMoreAddressAssets(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.assets++;
      this.getAddressAssets(shouldLoad);
    }
  }

  onAddressAccountsFilter(status: boolean) {
    this.currentPage.accounts = 1;
    this.getAddressAccounts(false, status);
  }

  onAddressAssetsFilter(status: boolean) {
    this.currentPage.assets = 1;
    this.getAddressAssets(false, status);
  }

  getAddressAccounts(shouldAppend: boolean = false, status?: boolean) {
    if (this.blockchainAddress) {
      this.addressStoreService.getAccounts(
        this.blockchainAddress,
        this.currentPage.accounts,
        this.pageLimit,
        shouldAppend,
        status
      );
    }
  }

  onLoadMoreAddressAccounts(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.accounts++;
      this.getAddressAccounts(shouldLoad);
    }
  }

  getAddressDelegatedStakes(shouldAppend: boolean = false) {
    if (this.blockchainAddress) {
      this.addressStoreService.getDelegatedStakes(
        this.blockchainAddress,
        this.currentPage.delegatedStakes,
        this.pageLimit,
        shouldAppend
      );
    }
  }

  onLoadMoreAddressDelegatedStakes(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.delegatedStakes++;
      this.getAddressDelegatedStakes(shouldLoad);
    }
  }

  getAddressReceivedStakes(shouldAppend: boolean = false) {
    if (this.blockchainAddress) {
      this.addressStoreService.getReceivedStakes(
        this.blockchainAddress,
        this.currentPage.receivedStakes,
        this.pageLimit,
        shouldAppend
      );
    }
  }

  onLoadMoreAddressReceivedStakes(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.receivedStakes++;
      this.getAddressReceivedStakes(shouldLoad);
    }
  }

  getAddressEvents(shouldAppend: boolean = false) {
    if (this.blockchainAddress) {
      this.addressStoreService.getEvents(this.blockchainAddress, this.currentPage.events, this.pageLimit, shouldAppend);
    }
  }

  onLoadMoreAddressEvents(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.events++;
      this.getAddressEvents(shouldLoad);
    }
  }
}
