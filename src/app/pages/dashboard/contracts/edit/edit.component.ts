import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { CustomDateParserFormatter } from '../../../../logic/dateparser';
import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';
import { IContract } from '../../../../logic/contract.interface';
import { ContractsService } from '../../../../services/contracts.service';
import { ILoan } from '../../../../logic/loan.interface';
import { currencies } from '../../../../logic/currencies';

// @Injectable()
// export class CustomDatePickerI18n extends NgbDatepickerI18n {
//   constructor(private _i18n: I18n) {
//     super();
//   }
//
//   getWeekdayShortName(weekday: number): string {
//     return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
//   }
//   getMonthShortName(month: number): string {
//     return I18N_VALUES[this._i18n.language].months[month - 1];
//   }
//   getMonthFullName(month: number): string {
//     return this.getMonthShortName(month);
//   }
// }

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
  // providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}],
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  contract: IContract;
  edit: boolean;
  message: string;
  messageType: string;
  id: string;
  contacts: Array<IContact>;
  currencies = currencies;

  constructor(
    private fb: FormBuilder,
    private contractsService: ContractsService,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    this.contract = {
      type: 0,
      title: '',
      borrower: null,
      lender: null,
      loan: {
        amount: null,
        currency: 'CHF',
        goal: '',
        hasGoal: null,
        hasLent: null,
        interest: null,
        datePayoff: '',
        amountPayoff: null,
      },
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
          let tmp: any = data;
          tmp.loan.datePayoff = this.ngbDateParserFormatter.parse(data.loan.datePayoff);
          this.editForm.patchValue(tmp);
          this.contract.borrower = data.borrower;
          this.contract.lender = data.lender;
          this.contract.loan = data.loan;
        }, err => {
          console.error(err);
        });
    }
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      type: [this.contract.type, Validators.required],
      title: [this.contract.title, Validators.required],
      borrower: [this.contract.borrower, Validators.required],
      lender: [this.contract.lender, Validators.required],
      loan: this.fb.group({
        amount: [this.contract.loan.amount, Validators.required],
        currency: [this.contract.loan.currency, Validators.required],
        interest: [this.contract.loan.interest, Validators.required],
        goal: [this.contract.loan.goal],
        hasGoal: [this.contract.loan.hasGoal],
        datePayoff: [
          this.ngbDateParserFormatter.parse(this.contract.loan.datePayoff)
        ],
        amountPayoff: [this.contract.loan.amountPayoff],
      }),
    });
  }

  onSubmit(value) {
    if (this.edit) {
      this.editContract(value);
    } else {
      this.addContract(value);
    }
  }

  addContract(value) {
    value.loan.hasGoal = value.loan.goal ? true : false;
    value.loan.datePayoff =
      this.ngbDateParserFormatter.format(value.loan.datePayoff);
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
    value.loan.hasGoal = value.loan.goal ? true : false;
    value.loan.datePayoff =
      this.ngbDateParserFormatter.format(value.loan.datePayoff);
    this.contractsService
      .update(value, this.id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/contracts/', this.id]);
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
        this.contract.borrower = result;
        this.editForm.patchValue({
          borrower: result,
        });
      }
      if (type == 'lender') {
        this.contract.lender = result;
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
