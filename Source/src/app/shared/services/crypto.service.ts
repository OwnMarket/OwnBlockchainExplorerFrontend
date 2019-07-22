import { Injectable } from '@angular/core';

declare var ownBlockchainSdk: any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  public deriveHash(address: string, nonce: number, txActionNumber: number): string {
    return ownBlockchainSdk.crypto.deriveHash(address, nonce, txActionNumber);
  }
}
