export interface ValidatorStat {
  blockchainAddress: string;
  networkAddress: string;
  sharedRewardPercent: number;
  totalStake: number;
  deposit: number;
  blocksProposed: number;
  txsProposed: number;
  rewardsCollected: number;
  rewardsDistributed: number;
  isActive: boolean;
  fullAddress?: {
    blockchainAddress: string;
    networkAddress: string;
  };
}
