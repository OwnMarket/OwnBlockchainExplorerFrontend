import { Deposit } from './deposit.model';

export interface Equivocation {
  equivocationProofHash: string;
  blockNumber: number;
  consensusRound: number;
  consensusStep: string;
  equivocationValue1: string;
  equivocationValue2: string;
  signature1: string;
  includedInBlockNumber: number;
  takenDeposit: Deposit;
  givenDeposits: Deposit[];
}
