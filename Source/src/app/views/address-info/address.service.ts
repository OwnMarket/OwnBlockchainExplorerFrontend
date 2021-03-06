import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  addressInfo: (blockchainAddress: string) => `/address/${blockchainAddress}`,
  addressAccounts: (blockchainAddress: string, c: PageLimitContext, status?: boolean) =>
    `/address/${blockchainAddress}/accounts?page=${c.page}&limit=${c.limit}${
      status != null ? '&isActive=' + status : ''
    }`,
  addressAssets: (blockchainAddress: string, c: PageLimitContext, status?: boolean) =>
    `/address/${blockchainAddress}/assets?page=${c.page}&limit=${c.limit}${
      status != null ? '&isActive=' + status : ''
    }`,
  addressDelegatedStakes: (blockchainAddress: string, c: PageLimitContext) =>
    `/address/${blockchainAddress}/delegated-stakes?page=${c.page}&limit=${c.limit}`,
  addressReceivedStakes: (blockchainAddress: string, c: PageLimitContext) =>
    `/address/${blockchainAddress}/received-stakes?page=${c.page}&limit=${c.limit}`,
  addressEvents: (blockchainAddress: string, c: PageLimitContext, filter?: string) =>
    filter
      ? `/address/${blockchainAddress}/events?page=${c.page}&limit=${c.limit}&filter=${filter}`
      : `/address/${blockchainAddress}/events?page=${c.page}&limit=${c.limit}`
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
  getAddressAccounts(blockchainAddress: string, context: PageLimitContext, status?: boolean): Observable<[]> {
    return this.httpClient.get(routes.addressAccounts(blockchainAddress, context, status)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address accounts'))
    );
  }

  // TODO: add models
  getAddressAssets(blockchainAddress: string, context: PageLimitContext, status?: boolean): Observable<[]> {
    return this.httpClient.get(routes.addressAssets(blockchainAddress, context, status)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }
  // TODO: add models
  getAddressDelegatedStakes(blockchainAddress: string, context: PageLimitContext): Observable<any> {
    return this.httpClient.get(routes.addressDelegatedStakes(blockchainAddress, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }

  // TODO: add models
  getAddressReceivedStakes(blockchainAddress: string, context: PageLimitContext): Observable<any> {
    return this.httpClient.get(routes.addressReceivedStakes(blockchainAddress, context)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address assets'))
    );
  }

  // TODO: add models
  getAddressEvents(blockchainAddress: string, context: PageLimitContext, filter?: string): Observable<[]> {
    return this.httpClient.get(routes.addressEvents(blockchainAddress, context, filter)).pipe(
      // TODO: make GENERIC api model!!
      map((response: any) => response.data),
      // TODO: make common error logger
      catchError(() => of('Error, could not get address events'))
    );
  }
}
