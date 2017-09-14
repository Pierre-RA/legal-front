import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../../logic/contact';

@Component({
  selector: 'template-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;
  @Input() redirect: boolean;
  @Input() selected: boolean;
  selectedClass: string;

  constructor(private router: Router) {
    this.selectedClass = '';
  }

  ngOnInit() {}

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        this.contact = changedProp.currentValue;
      }
    }
  }

  onClick() {
    if (this.redirect) {
      this.router.navigate(['/dashboard/contacts/', this.contact.getId()]);
    }
    if (this.selected) {
      this.selectedClass = this.selectedClass == 'selected-grey' ? '' : 'selected-grey';
    }
  }

}
