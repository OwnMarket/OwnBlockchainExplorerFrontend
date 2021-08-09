export interface Tx {
  actionFee: number;
  blockNumber: number;
  errorMessage: string;
  expirationTime: string;
  failedActionNumber: number;
  hash: string;
  nonce: number;
  numberOfActions: number;
  senderAddress: string;
  status: string;
  timestamp: string;
}
