import { Component, OnInit } from '@angular/core';

import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

  list: Array<IContact>;

  constructor(private contactsService: ContactsService) {
    this.contactsService
      .findAll()
      .subscribe(data => {
        this.list = data;
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }

}
