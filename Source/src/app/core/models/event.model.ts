export interface Event {
  blockNumber: number;
  transactionHash: string;
  equivocationHash: string;
  eventDetails: string;
  amount: number;
  fee: number;
}
