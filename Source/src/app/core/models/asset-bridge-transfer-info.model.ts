export interface AssetBridgeTransferInfo {
  transferTypeCode: string;
  blockchainCode: string;
  amount: number;
  blockTime: string;
  originalTxHash: string;
  swapTxHash: string;
}
