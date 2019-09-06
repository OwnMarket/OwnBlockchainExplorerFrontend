import { ValidatorCurrency } from './validator-currency.model';
import { ValidatorTimeZone } from './validator-time-zone.model';

export interface ValidatorLocation {
  ip: string;
  continent_code: string;
  country_code2: string;
  country_name: string;
  country_capital: string;
  state_prov: string;
  city: string;
  latitude: string;
  longitude: string;
  calling_code: string;
  languages: string;
  country_flag: string;
  isp: string;
  currency: ValidatorCurrency;
  time_zone: ValidatorTimeZone;
}
