import { Component, OnInit } from '@angular/core';

import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})
export class ContractlistComponent implements OnInit {

  contracts = [];

  constructor(private contractsService: ContractsService) {
    this.contractsService
      .findAll()
      .subscribe(
        data => {
          this.contracts = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }

}
