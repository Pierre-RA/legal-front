import { Component, OnInit } from '@angular/core';

import { ContactsService } from '../../../services/contacts.service';
import { ContractsService } from '../../../services/contracts.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  contacts: Number;
  moralContacts: Number;
  physicalContacts: Number;

  contracts: Number;
  contractsType: Array<Number>;

  warning: boolean;

  constructor(
    private contactsService: ContactsService,
    private contractsService: ContractsService
  ) {
    this.contacts = 0;
    this.physicalContacts = 0;
    this.moralContacts = 0;
    this.contracts = 0;
    this.contractsType = [0];
    this.warning = true;
    this.countContacts();
    this.countContacts('physical');
    this.countContacts('moral');
    this.countContracts();
  }

  ngOnInit() {
  }

  countContacts(type?: string): void {
    this.contactsService.count(type)
      .subscribe(
        data => {
          if (!type) {
            this.contacts = data;
          }
          if (type == 'moral') {
            this.moralContacts = data;
          }
          if (type == 'physical') {
            this.physicalContacts = data;
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  countContracts(): void {
    this.contractsService.count()
      .subscribe(
        data => {
          this.contracts = data;
          this.contractsType[0] = data;
        },
        err => {
          console.error(err);
        }
      );
  }

  closeAlert(): void {
    this.warning = false;
  }

}
