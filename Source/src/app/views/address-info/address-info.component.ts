import { Component, OnInit, OnDestroy } from '@angular/core';
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
  blockchainAddress: any;
  // TODO: make general loader
  isLoading = false;
  // TODO: make models
  addressInfo: Observable<any>;

  // TODO: make models
  events: Observable<any[]>;
  eventsHeaders: any[] = [
    {
      label: 'Block number',
      key: 'blockNumber'
    },
    {
      label: 'Tx',
      key: 'transactionHash'
    },
    {
      label: 'Event info',
      key: 'eventDetails'
    },
    {
      label: 'Amount',
      key: 'amount'
    },
    {
      label: 'Fee',
      key: 'fee'
    }
  ];

  accounts: Observable<any[]>;
  accountsHeaders: any[] = [
    {
      label: 'Account Hash',
      key: 'hash'
    },
    {
      label: 'Status',
      key: 'isActive'
    }
  ];

  assets: Observable<any[]>;
  assetsHeaders: any[] = [
    {
      label: 'Asset Hash',
      key: 'hash'
    },
    {
      label: 'Asset code',
      key: 'assetCode'
    },
    {
      label: 'Status',
      key: 'isActive'
    }
  ];

  receivedStakes: Observable<any[]>;
  receivedStakesHeaders: any[] = [
    {
      label: 'Validator address',
      key: 'validatorAddress'
    },
    {
      label: 'Amount',
      key: 'amount'
    }
  ];

  delegatedStakes: Observable<any[]>;
  delegatedStakesHeaders: any[] = [
    {
      label: 'Staker address',
      key: 'stakerAddress'
    },
    {
      label: 'Amount',
      key: 'amount'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private addressStoreService: AddressInfoStoreService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        log.debug(params);
        this.blockchainAddress = params.get('address');
        this.addressInfo = this.addressStoreService.addressInfo$;
        this.events = this.addressStoreService.events$;
        this.receivedStakes = this.addressStoreService.receivedStakes$;
        this.delegatedStakes = this.addressStoreService.delegatedStakes$;
        this.assets = this.addressStoreService.assets$;
        this.accounts = this.addressStoreService.accounts$;

        this.getAddressInfo();
        this.getAddressEvents();
        this.getAddressAccounts();
        this.getAddressAssets();
        this.getAddressDelegatedStakes();
        this.getAddressReceivedStakes();
      });
  }

  ngOnDestroy() {}

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
