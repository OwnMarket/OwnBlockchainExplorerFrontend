import { Alert } from './alert.model';
export interface ApiResponse<T> {
  alerts: Alert[];
  data: T[];
  successfull: boolean;
}
