import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../../../../logic/contact';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

  list: Array<Contact>;
  load: boolean;
  noList: boolean;

  constructor(
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.load = true;
    this.noList = false;
    this.list = [];
    this.contactsService
      .findAll()
      .subscribe(data => {
        this.load = false;
        this.list = data;
        this.noList = this.list.length == 0;
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }

}
