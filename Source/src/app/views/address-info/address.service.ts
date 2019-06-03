import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  addressInfo: (blockchainAddress: string) => `/address/${blockchainAddress}`,
  addressAccounts: (blockchainAddress: string) => `/address/${blockchainAddress}/accounts`,
  addressAssets: (blockchainAddress: string) => `/address/${blockchainAddress}/assets`,
  addressDelegatedStakes: (blockchainAddress: string) => `/address/${blockchainAddress}/delegated-stakes`,
  addressReceivedStakes: (blockchainAddress: string) => `/address/${blockchainAddress}/received-stakes`,
  addressEvents: (blockchainAddress: string) => `/address/${blockchainAddress}/events`
};

//TODO: make common modal
export interface PageLimitContext {
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class AddressInfoService {
  constructor(private httpClient: HttpClient) {}
  // addresses info
  // TODO: add models
  getAddressInfo(blockchainAddress: string): Observable<any> {
    return this.httpClient.get(routes.addressInfo(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address info'))
    );
  }

  // TODO: add models
  getAddressAccounts(blockchainAddress: string): Observable<[]> {
    return this.httpClient.get(routes.addressAccounts(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address accounts'))
    );
  }

  // TODO: add models
  getAddressAssets(blockchainAddress: string): Observable<[]> {
    return this.httpClient.get(routes.addressAssets(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }
  // TODO: add models
  getAddressDelegatedStakes(blockchainAddress: string): Observable<[]> {
    return this.httpClient.get(routes.addressDelegatedStakes(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }

  // TODO: add models
  getAddressReceivedStakes(blockchainAddress: string): Observable<[]> {
    return this.httpClient.get(routes.addressReceivedStakes(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }

  // TODO: add models
  getAddressEvents(blockchainAddress: string): Observable<[]> {
    return this.httpClient.get(routes.addressEvents(blockchainAddress)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address events'))
    );
  }
}
