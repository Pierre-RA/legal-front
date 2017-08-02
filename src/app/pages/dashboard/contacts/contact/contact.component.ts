import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: IContact;
  id: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.contactsService.findOne(this.id)
      .subscribe(data => {
        this.contact = data;
      }, err => {
        console.error(err);
      });
  }

  ngOnInit() {
  }

}
