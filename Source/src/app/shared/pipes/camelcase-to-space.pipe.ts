import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpace'
})
export class CamelCaseToSpace implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value.split(/(?=[A-Z])/).join(' ');
  }
}
