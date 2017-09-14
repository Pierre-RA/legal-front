import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { format, parse, CountryCode } from 'libphonenumber-js';

import { countries, Country } from '../../../../logic/countries';
import { Contact, Phone } from '../../../../logic/contact';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  form: FormGroup;
  contact: Contact;
  edit: boolean;
  message: string;
  messageType: string;
  id: string;
  countries: Array<Country>;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let type = this.activatedRoute.snapshot.queryParams['type'] || 'physical';
    this.contact = Contact.getDefaultContact(type);
    this.edit = this.activatedRoute.snapshot.data['edit'] == 'true';
    this.countries = countries;
  }

  ngOnInit() {
    this.buildForm();
    this.fillForm();
    if (this.edit) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.contactsService.findOne(this.id)
        .subscribe(data => {
          this.contact = data;
          this.fillForm();
          this.onContactTypeChange(data.type);
        }, err => {
          console.error(err);
        });
    }
  }

  onContactTypeChange(entry): void {
    this.contact.type = entry;
  }

  buildForm(): void {
    this.form = this.fb.group({
      type: [this.contact.type, Validators.required],
      email: [this.contact.email],
      phone: this.fb.group({
        country: [this.contact.phone.country],
        phone: [this.contact.phone.phone],
      }),
      firstName: [this.contact.firstName],
      lastName: [this.contact.lastName],
      reason: [this.contact.reason],
      gender: [this.contact.gender],
      address: this.fb.group({
        line1: [this.contact.address.line1, Validators.required],
        line2: [this.contact.address.line2],
        line3: [this.contact.address.line3],
        postCode: [this.contact.address.postCode, Validators.required],
        city: [this.contact.address.city, Validators.required],
        province: [this.contact.address.province],
        country: [this.contact.address.country, Validators.required]
      }),
    });
  }

  fillForm(): void {
    if (this.contact.phone) {
      this.contact.phone.phone = format(this.contact.phone.phone, this.contact.phone.country as CountryCode, 'National');
    } else {
      this.contact.phone = new Phone().deserialize({
        country: '',
        phone: ''
      });
    }
    this.form.patchValue(this.contact);
  }

  onSubmit(value) {
    value.phone = parse(value.phone.phone, value.phone.country);
    if (this.edit) {
      this.editContact(value);
    } else {
      this.addContact(value);
    }
  }

  editContact(value) {
    this.contactsService
      .update(value, this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contacts/', this.id]);
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
