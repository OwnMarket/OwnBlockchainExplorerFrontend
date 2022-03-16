export interface AccountSummary {
  hash: string;
  assetsCount: number;
  transfersCount: number | null;
  controllerAddress: string;
}
