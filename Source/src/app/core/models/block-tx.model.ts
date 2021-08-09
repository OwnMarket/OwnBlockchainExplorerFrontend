export interface BlockTx {
  blockNumber: number;
  hash: string;
  numberOfActions: number;
  senderAddress: string;
  status: string;
  timestamp: string;
}
