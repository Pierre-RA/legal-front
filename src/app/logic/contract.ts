import { Serializable } from './serialize';
import { IContract, ILoan } from './contract.interface';
import Contact from './contact';

export class Contract implements IContract {
  id: String;
  borrower: Contact;
  lender: Contact;
  loan: Loan;
  type: Number;

  constructor() {}

  deserialize(input: any): this {
    this.id = input.id;
    this.borrower = new Contact().deserialize(input.borrower);
    this.lender = new Contact().deserialize(input.lender);
    this.loan = new Loan().deserialize(input.loan);
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

  getType(): Number {
    return this.type;
  }

  export(): object {
    return {
      borrower: this.borrower.getTitle(),
      lender: this.lender.getTitle(),
      hasGoal: this.loan.hasGoal,
      goal: this.loan.goal,
      hasLent: this.loan.hasLent,
      dateLent: this.loan.formatDate("dateLent")
    }
  }
}

export class Loan implements ILoan, Serializable<Loan> {
  goal: String;
  hasGoal: Boolean;
  hasLent: Boolean;
  dateLent: Date;
  currency: String;
  amount: Number;
  interest: Number;

  constructor() {}

  deserialize(input: any) {
    this.currency = input.currency;
    this.amount = input.amount;
    this.interest = input.interest;
    this.hasGoal = input.hasGoal;
    this.goal = input.goal || '';
    this.hasLent = input.hasLent;
    this.dateLent = input.dateLent;
    return this;
  }

  // TODO: use moment for dateLent
  formatDate(key: string) {
    if (key == "dateLent") {
      return this.dateLent
    }
  }
}
