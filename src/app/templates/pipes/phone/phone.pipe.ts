import { Pipe, PipeTransform } from '@angular/core';
import { parse, format, CountryCode } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string, args?: string[]): any {
    if (!value) {
      return value;
    }
    if (args && args.length == 1) {
      const country = args[0].toUpperCase();
      return format(value, country as CountryCode, 'International');
    }
    return format(value, 'CH', 'International');
  }

}
