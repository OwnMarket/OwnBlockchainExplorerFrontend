import { Component, OnInit, OnDestroy, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Logger, untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { Observable, Subscription } from 'rxjs';
import { AddressInfoStoreService } from './address-store.service';

const log = new Logger('AdressInfo');
@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
})
export class AddressInfoComponent implements OnInit, OnDestroy {
  @ViewChild('header', { static: true }) headerTpl: TemplateRef<any>;
  @ViewChild('blockLink', { static: true }) blockLink: TemplateRef<any>;
  @ViewChild('addLink', { static: true }) addLink: TemplateRef<any>;
  @ViewChild('txLink', { static: true }) txLink: TemplateRef<any>;
  @ViewChild('eventDate', { static: true }) eventDate: TemplateRef<any>;
  @ViewChild('eventAmount', { static: true }) eventAmount: TemplateRef<any>;
  @ViewChild('account', { static: true }) accountTpl: TemplateRef<any>;
  @ViewChild('asset', { static: true }) assetTpl: TemplateRef<any>;

  @Input() tableHeight = '500px';
  @Input() pageLimit = 20;

  currentPage = {
    events: 1,
    accounts: 1,
    assets: 1,
    receivedStakes: 1,
    delegatedStakes: 1,
  };

  subscription: Subscription;
  blockchainAddress: string;

  addressInfo: Observable<any>;
  loadingAddressInfo: Observable<boolean>;

  // Events data set
  events: Observable<any[]>;
  loadingEvents: Observable<boolean>;
  eventColumns: any[];
  eventsCount: Observable<number>;

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
  receivedStakesTotal: Observable<number>;
  receivedStakeColumns: any[];

  // Delegated stakes data set
  delegatedStakes: Observable<any[]>;
  loadingDelegatedStakes: Observable<boolean>;
  delegatedStakesTotal: Observable<number>;
  delegatedStakeColumns: any[];

  // Filter
  currentFilter: string;

  constructor(private route: ActivatedRoute, private addressStoreService: AddressInfoStoreService) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.setupColumns();
      this.blockchainAddress = params.get('address');
      this.addressInfo = this.addressStoreService.addressInfo$.pipe(untilDestroyed(this));
      this.loadingAddressInfo = this.addressStoreService.loadingAddressInfo$.pipe(untilDestroyed(this));

      this.events = this.addressStoreService.events$.pipe(untilDestroyed(this));
      this.loadingEvents = this.addressStoreService.loadingEvents$.pipe(untilDestroyed(this));
      this.eventsCount = this.addressStoreService.eventsCount$.pipe(untilDestroyed(this));

      this.receivedStakes = this.addressStoreService.receivedStakes$.pipe(untilDestroyed(this));
      this.loadingReceivedStakes = this.addressStoreService.loadingReceivedStakes$.pipe(untilDestroyed(this));
      this.receivedStakesTotal = this.addressStoreService.totalReceivedStakes$.pipe(untilDestroyed(this));

      this.delegatedStakes = this.addressStoreService.delegatedStakes$.pipe(untilDestroyed(this));
      this.loadingDelegatedStakes = this.addressStoreService.loadingDelegatedStakes$.pipe(untilDestroyed(this));
      this.delegatedStakesTotal = this.addressStoreService.totalDelegatedStakes$.pipe(untilDestroyed(this));

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterEvents(event: string) {
    if (event !== '') {
      this.currentFilter = event;
    } else {
      this.currentFilter = null;
    }
    this.currentPage.events = 1;
    this.addressStoreService.events = [];
    this.getAddressEvents();
  }

  setupColumns() {
    this.eventColumns = [
      {
        name: 'explorer.blockNumber',
        prop: 'blockNumber',
        sortable: false,
        maxWidth: 120,
        cellTemplate: this.blockLink,
        headerClass: 'text-center',
        cellClass: 'text-center',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.dateTime',
        prop: 'blockTime',
        sortable: false,
        width: 150,
        cellTemplate: this.eventDate,
        headerClass: 'text-center',
        cellClass: 'text-center',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.txHash',
        prop: 'hash',
        sortable: false,
        cellTemplate: this.txLink,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.eventInfo',
        prop: 'eventDetails',
        sortable: false,
        width: 150,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        sortable: false,
        width: 150,
        cellTemplate: this.eventAmount,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.fee',
        prop: 'fee',
        width: 100,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.accountColumns = [
      {
        name: 'explorer.accountHash',
        prop: 'hash',
        sortable: false,
        headerTemplate: this.headerTpl,
        cellTemplate: this.accountTpl,
      },
    ];

    this.assetColumns = [
      {
        name: 'explorer.assetHash',
        prop: 'hash',
        sortable: false,
        headerTemplate: this.headerTpl,
        cellTemplate: this.assetTpl,
      },
      {
        name: 'explorer.code',
        prop: 'assetCode',
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.delegatedStakeColumns = [
      {
        name: 'explorer.address',
        prop: 'validatorAddress',
        sortable: false,
        cellTemplate: this.addLink,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        maxWidth: 80,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];

    this.receivedStakeColumns = [
      {
        name: 'explorer.stakerAddress',
        prop: 'stakerAddress',
        sortable: false,
        cellTemplate: this.addLink,
        headerTemplate: this.headerTpl,
      },
      {
        name: 'explorer.amount',
        prop: 'amount',
        maxWidth: 80,
        sortable: false,
        headerClass: 'text-right',
        cellClass: 'text-right',
        headerTemplate: this.headerTpl,
      },
    ];
  }

  getExportEventsUrl(address: string): string {
    return `${environment.serverUrl}/address/${address}/events/download`;
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
      this.addressStoreService.getEvents(
        this.blockchainAddress,
        this.currentPage.events,
        this.pageLimit,
        shouldAppend,
        this.currentFilter
      );
    }
  }

  onLoadMoreEvents(shouldLoad: boolean) {
    if (shouldLoad) {
      this.currentPage.events++;
      this.getAddressEvents(shouldLoad);
    }
  }
}
