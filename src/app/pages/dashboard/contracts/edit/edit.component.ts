import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { CustomDateParserFormatter } from '../../../../logic/dateparser';
import { IContact } from '../../../../logic/contact.interface';
import { ContactsService } from '../../../../services/contacts.service';
import { IContract } from '../../../../logic/contract.interface';
import { Contract } from '../../../../logic/contract';
import { ContractsService } from '../../../../services/contracts.service';
import { ILoan, IPayoff } from '../../../../logic/loan.interface';
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
    this.contract = this.getDefaultContract();
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
          let payoff = data.loan.payoff;
          data.loan.payoff = [];
          let tmp: any = data;
          tmp.loan.dateLent = this.ngbDateParserFormatter.parse(tmp.loan.dateLent);
          tmp.loan.extendNegotiationDate = this.ngbDateParserFormatter.parse(tmp.loan.extendNegotiationDate);
          tmp.loan.silentDate = this.ngbDateParserFormatter.parse(tmp.loan.silentDate);
          this.editForm.patchValue(tmp);
          const control = <FormArray>this.editForm.controls['loan'].get('payoff');
          control.removeAt(0);
          payoff.forEach(item => {
            let tmp = this.fb.group({
              date: this.ngbDateParserFormatter.parse(item.date),
              amount: item.amount
            });
            control.push(tmp);
          });
          this.contract.borrower = data.borrower;
          this.contract.lender = data.lender;
          this.contract.loan = data.loan;
        }, err => {
          console.error(err);
        });
    }
  }

  ngOnInit() {
    // Build form
    this.buildForm();
    // this.editForm.controls['loan']['controls']['amount'].valueChanges.subscribe(value => {
    //   this.addOrEdit(value);
    // });
  }

  onSubmit(value: IContract) {
    if (this.edit) {
      this.editContract(value);
    } else {
      this.addContract(value);
    }
  }

  addContract(value: IContract) {
    value.loan.hasGoal = value.loan.goal ? true : false;
    value.loan.amount = 0;
    value.loan.payoff.forEach(item => {
      value.loan.amount += item.amount;
    });
    value = this.formatDates(value);
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

  editContract(value: IContract) {
    value.loan.hasGoal = value.loan.goal ? true : false;
    value.loan.amount = 0;
    value.loan.payoff.forEach(item => {
      value.loan.amount += item.amount;
    });
    value = this.formatDates(value);
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
    }, (reason) => {});
  }

  getDefaultContract(): Contract {
    return new Contract().deserialize({
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
        payoff: [],
        dateLent: null,
        extendNegotiationDate: null,
        silentDate: null,
      },
    });
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      type: [this.contract.type, Validators.required],
      title: [this.contract.title, Validators.required],
      borrower: [this.contract.borrower, Validators.required],
      lender: [this.contract.lender, Validators.required],
      loan: this.fb.group({
        amount: [{value: this.contract.loan.amount, disabled: true}, Validators.required],
        currency: [this.contract.loan.currency, Validators.required],
        interest: [this.contract.loan.interest, Validators.required],
        goal: [this.contract.loan.goal],
        hasGoal: [this.contract.loan.hasGoal],
        payoff: this.fb.array(
          this.formatPayoffs(this.contract.loan.payoff)
        ),
        dateLent: [this.contract.loan.dateLent, Validators.required],
        extendNegotiationDate: [this.contract.loan.extendNegotiationDate],
        silentDate: [this.contract.loan.silentDate],
      }),
    });
  }

  formatPayoffs(payoff: Array<IPayoff>) {
    let result = [];
    if (payoff.length == 0) {
      result.push(this.fb.group({
        amount: null,
        date: null,
      }));
    }
    payoff.forEach(item => {
      result.push(this.fb.group({
        amount: item.amount,
        date: this.ngbDateParserFormatter.parse(item.date)
      }));
    });
    return result;
  }

  formatDates(value) {
    value.loan.payoff.forEach(item => {
      item.date = this.ngbDateParserFormatter.format(item.date);
    });
    value.loan.dateLent = this.ngbDateParserFormatter.format(value.loan.dateLent);
    value.loan.extendNegotiationDate = this.ngbDateParserFormatter.format(value.loan.extendNegotiationDate);
    value.loan.silentDate = this.ngbDateParserFormatter.format(value.loan.silentDate);
    return value;
  }

  addDue(): void {
    const control = <FormArray>this.editForm.controls['loan'].get('payoff');
    control.push(this.fb.group({
      date: null,
      amount: null
    }));
  }

  removeTacit(): void {
    this.editForm.controls['loan'].patchValue({
      silentDate: null
    });
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.messageType = type;
  }

}
