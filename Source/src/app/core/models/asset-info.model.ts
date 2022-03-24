import { AssetBridgeTransferStat } from './asset-bridge-transfer-stat.model';

export interface AssetInfo {
  hash: string;
  assetCode: string;
  totalSupply: number;
  holdersCount: number;
  transfersCount: number;
  controllerAddress: string;
  bridgeTransferStats: AssetBridgeTransferStat[];
}
