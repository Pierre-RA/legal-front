import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  contact: IContact;
  edit: boolean;
  message: string;
  messageType: string;
  id: string;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.contact = {
      _id: '',
      type: this.activatedRoute.snapshot.queryParams['type'] || 'physical',
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      reason: '',
      isMale: false,
      address: {
        line1: '',
        line2: '',
        line3: '',
        postCode: '',
        city: '',
        province: '',
        country: ''
      }
    };
    this.edit = this.activatedRoute.snapshot.data['edit'] == 'true';
    if (this.edit) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.contactsService.findOne(this.id)
        .subscribe(data => {
          this.editForm.patchValue(data);
          this.onContactTypeChange(data.type);
        }, err => {
          console.error(err);
        });
    }
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      type: [this.contact.type, Validators.required],
      email: [this.contact.email],
      phone: [this.contact.phone],
      firstName: [this.contact.firstName],
      lastName: [this.contact.lastName],
      reason: [this.contact.reason],
      isMale: [this.contact.isMale],
      address: this.fb.group({
        line1: [this.contact.address.line1],
        line2: [this.contact.address.line2],
        line3: [this.contact.address.line3],
        postCode: [this.contact.address.postCode],
        city: [this.contact.address.city],
        province: [this.contact.address.province],
        country: [this.contact.address.country]
      }),
    });
  }

  onContactTypeChange(entry): void {
    this.contact.type = entry;
  }

  onSubmit(value) {
    if (this.edit) {
      this.editContact(value);
    }
    this.addContact(value);
  }

  editContact(value) {
    this.contactsService
      .update(value, this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contacts/', data.getId()]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contact pour l\'instant',
          'danger'
        );
      });
  }

  addContact(value) {
    this.contactsService
      .create(value)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contacts/', data.getId()]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contact pour l\'instant',
          'danger'
        );
      });
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
  }

}
