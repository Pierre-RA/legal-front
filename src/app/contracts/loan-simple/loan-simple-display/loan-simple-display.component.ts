import { Component, OnInit, Input } from '@angular/core';

import { LoanSimpleContract } from '../loan-simple-contract';

@Component({
  selector: 'display-loan-simple',
  templateUrl: './loan-simple-display.component.html',
  styleUrls: ['./loan-simple-display.component.scss']
})
export class LoanSimpleDisplayComponent implements OnInit {

  @Input('contract') contract: LoanSimpleContract;

  constructor() { }

  ngOnInit() {}

}
