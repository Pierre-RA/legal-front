import { Component, OnInit, Input } from '@angular/core';

import { IContact } from '../../logic/contact.interface';
import Contact from '../../logic/contact';

@Component({
  selector: 'template-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: IContact;
  contactExtended: Contact;

  constructor() {}

  ngOnInit() {
    this.contactExtended = new Contact().deserialize(this.contact);
  }

}
