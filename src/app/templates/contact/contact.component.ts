import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.contactExtended = new Contact().deserialize(this.contact);
  }

  goToContact(id: String) {
    this.router.navigate(['/dashboard/contacts/', id]);
  }

}
