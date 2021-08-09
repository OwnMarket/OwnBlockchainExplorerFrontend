export interface Block {
  blockNumber: number;
  configuration: any;
  configurationBlockNumber: number;
  configurationRoot: string;
  consensusRound: number;
  equivocationProofResultsRoot: string;
  equivocationProofsRoot: string;
  hash: string;
  previousBlockHash: string;
  previousBlockNumber: number;
  signatures: string;
  stakingRewardsRoot: string;
  stateRoot: string;
  timestamp: string;
  txResultSetRoot: string;
  txSetRoot: string;
  validatorAddress: string;
}
