import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';
import { TransactionsService } from '../transactions.service';

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
  addressInfo: any;

  // TODO: make models
  events: any[];
  receivedStakes: any[];
  delegatedStakes: any[];
  assets: any[];
  accounts: any[];

  constructor(private route: ActivatedRoute, private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
      this.isLoading = true;
      log.debug(params);
      this.blockchainAddress = params.get('address');
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
      this.transactionsService
        .getAddressInfo(this.blockchainAddress)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(info => {
          log.debug(info);
          this.addressInfo = info;
        });
    }
  }

  getAddressAssets() {
    if (this.blockchainAddress) {
      this.transactionsService
        .getAddressAssets(this.blockchainAddress)
        .pipe(untilDestroyed(this))
        .subscribe(list => {
          log.debug(list);
          this.assets = list;
        });
    }
  }

  getAddressAccounts() {
    if (this.blockchainAddress) {
      this.transactionsService
        .getAddressAccounts(this.blockchainAddress)
        .pipe(untilDestroyed(this))
        .subscribe(list => {
          log.debug(list);
          this.accounts = list;
        });
    }
  }

  getAddressDelegatedStakes() {
    if (this.blockchainAddress) {
      this.transactionsService
        .getAddressDelegatedStakes(this.blockchainAddress)
        .pipe(untilDestroyed(this))
        .subscribe(list => {
          log.debug(list);
          this.delegatedStakes = list;
        });
    }
  }

  getAddressReceivedStakes() {
    if (this.blockchainAddress) {
      this.transactionsService
        .getAddressReceivedStakes(this.blockchainAddress)
        .pipe(untilDestroyed(this))
        .subscribe(list => {
          log.debug(list);
          this.receivedStakes = list;
        });
    }
  }
  getAddressEvents() {
    if (this.blockchainAddress) {
      this.transactionsService
        .getAddressEvents(this.blockchainAddress)
        .pipe(untilDestroyed(this))
        .subscribe(list => {
          log.debug(list);
          this.events = list;
        });
    }
  }
}
