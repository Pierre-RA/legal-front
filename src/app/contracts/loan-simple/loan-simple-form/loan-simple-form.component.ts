import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { CustomDateParserFormatter } from '../../../logic/dateparser';
import { Contact } from '../../../logic/contact';
import { ContactsService } from '../../../services/contacts.service';
import { AbstractContract } from '../../abstract-contract';
import { LoanSimpleContract, Payoff } from '../loan-simple-contract';
import { currencies } from '../../../logic/currencies';
import { cantons, Canton } from '../../../logic/cantons/cantons';

@Component({
  selector: 'form-loan-simple',
  templateUrl: './loan-simple-form.component.html',
  styleUrls: ['./loan-simple-form.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class LoanSimpleFormComponent implements OnInit {

  form: FormGroup;
  contactList: Array<Contact>;
  currencies: Array<any>;
  cantons: Array<Canton>;
  contactType: string;
  @Input('contract') contract: LoanSimpleContract;
  @Input('id') id: string;
  @Output() filled: EventEmitter<LoanSimpleContract> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    this.contactType = '';
    this.currencies = currencies;
    this.cantons = cantons;
    this.contactList = [];

    // Fetch contact list
    this.contactsService.findAll()
      .subscribe(data => {
        this.contactList = data;
      });
  }

  ngOnInit() {
    // Fetch the contract
    if (this.contract) {
      this.buildForm();
      this.fillForm(this.contract);
    }
  }

  /**
   * Fill the form with detailed data
   */
  fillForm(data: LoanSimpleContract): void {
    let payoff = data.loan.payoff;
    data.loan.payoff = [];
    let tmp: any = data;
    tmp.loan.dateLent = this.ngbDateParserFormatter.parse(tmp.loan.dateLent);
    tmp.loan.extendNegotiationDate = this.ngbDateParserFormatter.parse(tmp.loan.extendNegotiationDate);
    tmp.loan.silentDate = this.ngbDateParserFormatter.parse(tmp.loan.silentDate);
    this.form.patchValue(tmp);
    const control = <FormArray>this.form.controls['loan'].get('payoff');
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
    this.computeTotalAmount();
  }

  /**
   * Upon user submition, determine if we create a contract
   * or edit an existing one
   */
  onSubmit(value: LoanSimpleContract): void {
    value.loan.amount = 0;
    value.loan.payoff.forEach(item => {
      value.loan.amount += item.amount;
    });
    value = this.formatDates(value);
    if (this.isEditing()) {
      value.id = this.id;
      this.filled.emit(value);
    } else {
      this.filled.emit(value);
    }
  }

  /**
   * Create the form
   */
  buildForm(): void {
    this.form = this.fb.group({
      type: [this.contract.type, Validators.required],
      title: [this.contract.title, Validators.required],
      borrower: [this.contract.borrower, Validators.required],
      lender: [this.contract.lender, Validators.required],
      country: [{ value: this.contract.country, disabled: true }],
      canton: [this.contract.canton, Validators.required],
      place: [this.contract.place],
      date: [this.contract.date],
      copiesNumber: ['', Validators.required],
      loan: this.fb.group({
        amount: [this.contract.loan.amount, Validators.required],
        totalAmount: [{ value: 0, disabled: true }],
        duration: [{ value: '', disabled: true }],
        currency: [this.contract.loan.currency, Validators.required],
        interest: [this.contract.loan.interest],
        goal: [this.contract.loan.goal],
        hasGoal: [this.contract.loan.hasGoal],
        payoff: this.fb.array(
          this.formatPayoffs(this.contract.loan.payoff)
        ),
        datePayback: [null, Validators.required],
        dateLent: [this.contract.loan.dateLent, Validators.required],
        extendNegotiationDate: [this.contract.loan.extendNegotiationDate],
        silentDate: [this.contract.loan.silentDate],
      }),
    });
    console.log(this.form);
  }

  /**
   * return true if we have a contract as parameter
   */
  isEditing(): boolean {
    return !!this.id;
  }

  /**
   * Open modal function
   */
  open(content, type) {
    this.contactType = type == 'borrower' ? 'Ajouter un emprunteur' : 'Ajouter un prêteur';
    this.modalService.open(content).result.then((result) => {
      if (type == 'borrower') {
        this.contract.borrower = result;
        this.form.patchValue({
          borrower: result,
        });
      }
      if (type == 'lender') {
        this.contract.lender = result;
        this.form.patchValue({
          lender: result,
        });
      }
    }, (reason) => {});
  }

  /**
   * Format Payoff to human readin format
   */
  formatPayoffs(payoff: Array<Payoff>) {
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

  /**
   * Format date to human reading format
   */
  formatDates(value): LoanSimpleContract {
    value.loan.payoff.forEach(item => {
      item.date = this.ngbDateParserFormatter.format(item.date);
    });
    value.loan.dateLent = this.ngbDateParserFormatter.format(value.loan.dateLent);
    value.loan.extendNegotiationDate = this.ngbDateParserFormatter.format(value.loan.extendNegotiationDate);
    value.loan.silentDate = this.ngbDateParserFormatter.format(value.loan.silentDate);
    return value;
  }

  addDue(): void {
    const control = <FormArray>this.form.controls['loan'].get('payoff');
    control.push(this.fb.group({
      date: null,
      amount: null
    }));
  }

  removeTacit(): void {
    this.form.controls['loan'].patchValue({
      silentDate: null
    });
  }

  computeTotalAmount(): void {
    if (
      this.form.get('loan.amount').value
    ) {
      let interest = this.form.get('loan.interest').value || 0;
      this.form.get('loan.totalAmount').setValue(
        this.roundFinancial(
          this.form.get('loan.amount').value *
          (1 + (interest / 100))
        )
      );
    }
  }

  computeDuration(): void {
    if (
      this.form.get('loan.dateLent') &&
      this.form.get('loan.datePayback')
    ) {
      this.form.get('loan.duration').setValue(
        'quelques jours'
      );
    }
  }

  roundFinancial(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
