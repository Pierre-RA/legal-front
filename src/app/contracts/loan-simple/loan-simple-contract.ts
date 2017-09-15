import { AbstractContract } from '../abstract-contract';
import { Serializable } from '../../logic/serialize';
import { Contact } from '../../logic/contact';
import { currencies } from '../../logic/currencies';

export class LoanSimpleContract
  extends AbstractContract
  implements Serializable<LoanSimpleContract> {

  borrower: Contact;
  lender: Contact;
  loan: Loan;

  constructor() {
    super(0);
  }

  deserialize(input: any): this {
    super.deserialize(input);

    if (input.borrower) {
      this.borrower = new Contact().deserialize(input.borrower);
    }
    if (input.lender) {
      this.lender = new Contact().deserialize(input.lender);
    }
    if (input.loan) {
      this.loan = new Loan().deserialize(input.loan);
    }

    return this;
  }

  getBorrower(): Contact {
    return this.borrower;
  }

  getLender(): Contact {
    return this.lender;
  }

  getLoan(): Loan {
    return this.loan;
  }

  static getType(): number {
    return 0;
  }

  static getDefaultContract(): LoanSimpleContract {
    return new LoanSimpleContract().deserialize({
      title: '',
      country: 'CH',
      canton: '',
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

}

export class Loan implements Serializable<Loan> {
  goal: string;
  hasLent: boolean;
  currency: string;
  amount: number;
  interest: number;
  payoff: Array<Payoff>;
  length: Date;
  extendNegotiationDate: Date;
  silentDate: Date;
  dateLent: Date;

  deserialize(input: any): this {
    this.currency = input.currency;
    this.amount = input.amount;
    this.interest = input.interest;
    this.goal = input.goal || '';
    this.hasLent = input.hasLent;
    this.payoff = [];
    if (input.payoff) {
      input.payoff.forEach(item => {
        this.payoff.push(item);
      });
    }
    this.length = input.length;
    this.extendNegotiationDate = input.extendNegotiationDate;
    this.silentDate = input.silentDate;
    this.dateLent = input.dateLent;
    return this;
  }

  getCurrency(): string {
    let result = 'N/A';
    currencies.forEach(currency => {
      if (currency.code == this.currency) {
        result = currency.plural;
      }
    });
    return result;
  }

  getTotalAmount(): number {
    let result = 0;
    this.payoff.forEach(item => {
      result += item.amount;
    });
    return result;
  }

  hasGoal(): boolean {
    return !!this.goal;
  }
}

export class Payoff implements Serializable<Payoff> {
  date: string;
  amount: number;

  deserialize(input: any) {
    this.date = input.date;
    this.amount = input.amount;
    return this;
  }
}
