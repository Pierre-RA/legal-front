import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Contact } from '../../../../logic/contact';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  id: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private modalService: NgbModal
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

  onDrop() {
    this.contactsService.delete(this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contacts']);
      });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.onDrop();
    }, dismissed => {});
  }

}
