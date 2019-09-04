import { ChxBalanceInfo } from './chx-balance-info.model';

export interface Address {
  blockchainAddress: string;
  nonce: number;
  chxBalanceInfo: ChxBalanceInfo;
}
