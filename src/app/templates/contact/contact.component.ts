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
  @Input() redirect: boolean;
  @Input() selected: boolean;
  contactExtended: Contact;
  selectedClass: string;

  constructor(private router: Router) {
    this.selectedClass = '';
  }

  ngOnInit() {
    this.contactExtended = new Contact().deserialize(this.contact);
  }

  onClick() {
    if (this.redirect) {
      this.router.navigate(['/dashboard/contacts/', this.contactExtended.getId()]);
    }
    if (this.selected) {
      this.selectedClass = this.selectedClass == 'selected-grey' ? '' : 'selected-grey';
    }
  }

}
