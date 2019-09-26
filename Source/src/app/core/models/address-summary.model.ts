import { AddressStat } from './address-stat.model';

export interface AddressSummary {
  addressCount: number;
  addresses: AddressStat[];
}
