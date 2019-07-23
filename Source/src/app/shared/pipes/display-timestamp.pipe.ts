import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTimestamp'
})
export class DisplayTimestampPipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value.replace('T', ' ');
  }
}
