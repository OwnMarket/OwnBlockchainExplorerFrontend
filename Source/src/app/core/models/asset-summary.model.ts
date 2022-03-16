export interface AssetSummary {
  hash: string;
  assetCode: string | null;
  totalSupply: number;
  holdersCount: number;
  transfersCount: number | null;
  controllerAddress: string | null;
}
