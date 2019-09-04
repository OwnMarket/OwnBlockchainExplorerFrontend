export interface ApiResponse<T> {
  alerts: any[];
  data: T[];
  successfull: boolean;
}
