import { Pipe, PipeTransform } from '@angular/core';
import { format, ParsedNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: ParsedNumber, args?: string): any {
    if (!value) {
      return value;
    }
    if (args && args == 'National') {
      return format(value, args);
    }
    return format(value, 'International');
  }

}
