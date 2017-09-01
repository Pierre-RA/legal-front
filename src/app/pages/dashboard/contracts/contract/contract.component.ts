import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs as importedSaveAs } from 'file-saver';

import { Contract } from '../../../../logic/contract';
import { ContractsService } from '../../../../services/contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  id: string;
  contract: Contract;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contractsService: ContractsService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.contractsService.findOne(this.id)
      .subscribe(data => {
        this.contract = new Contract().deserialize(data);
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
