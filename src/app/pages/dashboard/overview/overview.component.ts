import { Component, OnInit } from '@angular/core';

import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  contacts: Number;
  moralContacts: Number;
  physicalContacts: Number;

  constructor(private contactsService: ContactsService) {
    this.contacts = 0;
    this.physicalContacts = 0;
    this.moralContacts = 0;
    this.countContacts();
    this.countContacts('physical');
    this.countContacts('moral');
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

}
