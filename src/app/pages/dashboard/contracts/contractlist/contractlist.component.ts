import { Component, OnInit } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';

import { AbstractContract } from '../../../../contracts/';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'contractlist',
  templateUrl: './contractlist.component.html',
  styleUrls: ['./contractlist.component.scss']
})
export class ContractlistComponent implements OnInit {

  contracts: Array<AbstractContract>;
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

  unsetType() {
    localStorage.removeItem('type');
  }

  export(id: string, title: string) {
    this.contractsService
      .export(id)
      .subscribe(
        data => {
          importedSaveAs(data, title);
        },
        err => {
          console.log(err);
        }
      );
  }

}
