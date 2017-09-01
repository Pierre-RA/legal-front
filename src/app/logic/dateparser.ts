import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";

// @Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  datePipe = new DatePipe('fr-FR');
  // datePipe = new DatePipe('en-US');

  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    try {
      return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), 'longDate');
    } catch (e) {
      return '';
    }
  }

  parse(value: string): NgbDateStruct {
    let returnVal: NgbDateStruct;
    if (!value) {
      returnVal = null;
    } else {
      try {
        let tmp = value.split('T');
        tmp = tmp[0].split('-');
        returnVal = {
          year: parseInt(tmp[0]),
          month: parseInt(tmp[1]),
          day: parseInt(tmp[2]),
        };
      } catch (e) {
        console.log(e);
        returnVal = null;
      }
    }
    return returnVal;
  }
}
