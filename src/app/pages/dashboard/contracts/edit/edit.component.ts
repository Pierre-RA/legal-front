import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';
import { IContract } from '../../../../logic/contract.interface';
import { ContractsService } from '../../../../services/contracts.service';
import { ILoan } from '../../../../logic/loan.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  contract: IContract;
  borrower: IContact;
  lender: IContact;
  edit: boolean;
  message: string;
  messageType: string;
  id: string;
  contacts: Array<IContact>;

  constructor(
    private fb: FormBuilder,
    private contractsService: ContractsService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.contract = {
      type: 0,
      title: '',
      borrower: null,
      lender: null,
      loan: null,
    }
    this.contactsService.findAll()
      .subscribe(data => {
        this.contacts = data;
      }, err => {
        console.error(err);
      });
    this.edit = this.activatedRoute.snapshot.data['edit'] == 'true';
    if (this.edit) {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.contractsService.findOne(this.id)
        .subscribe(data => {
          this.editForm.patchValue(data);
        }, err => {
          console.error(err);
        });
    }
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      type: [this.contract.type, Validators.required],
      title: [this.contract.title],
      borrower: [this.contract.borrower, Validators.required],
      lender: [this.contract.lender, Validators.required],
    });
  }

  onSubmit(value) {
    if (this.edit) {
      this.editContract(value);
    }
    this.addContract(value);
  }

  addContract(value) {
    value.loan = {
      goal: 's',
      hasGoal: true,
      hasLent: true,
      dateLent: new Date().getDate(),
      currency: 'EUR',
      amount: 12000,
      interest: 3.4
    };
    this.contractsService
      .create(value)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts/', data.getId()]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contrat pour l\'instant',
          'danger'
        );
      });
  }

  editContract(value) {
    this.contractsService
      .update(value, this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts/', data.getId()]);
      }, err => {
        this.setMessage(
          'Impossible de créér ce contrat pour l\'instant',
          'danger'
        );
      });
  }

  open(content, type) {
    this.modalService.open(content).result.then((result) => {
      if (type == 'borrower') {
        this.borrower = result;
        this.editForm.patchValue({
          borrower: result,
        });
      }
      if (type == 'lender') {
        this.lender = result;
        this.editForm.patchValue({
          lender: result,
        });
      }
    }, (reason) => {
      console.log('dismissed.');
    });
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
  }

}
