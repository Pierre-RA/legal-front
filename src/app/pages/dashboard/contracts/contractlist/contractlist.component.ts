import { Component, OnInit } from '@angular/core';

import { IContract } from '../../../../logic/contract.interface';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})
export class ContractlistComponent implements OnInit {

  contracts: Array<IContract>;
  load: boolean;
  noList: boolean;

  constructor(private contractsService: ContractsService) {
    this.load = true;
    this.noList = false;
    this.contracts = [];
    this.contractsService
      .findAll()
      .subscribe(
        data => {
          this.load = false;
          this.contracts = data;
          this.noList = this.contracts.length == 0;
        },
        err => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
  }

}
