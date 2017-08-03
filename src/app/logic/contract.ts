import { Serializable } from './serialize';
import { IContract } from './contract.interface';
import { Loan } from './loan';
import Contact from './contact';

export class Contract implements IContract {
  id: String;
  borrower: Contact;
  lender: Contact;
  loan: Loan;
  type: Number;
  title: String;

  constructor() {}

  deserialize(input: any): this {
    this.id = input._id;
    this.borrower = new Contact().deserialize(input.borrower);
    this.lender = new Contact().deserialize(input.lender);
    this.loan = new Loan().deserialize(input.loan);
    this.title = input.title;
    this.type = input.type;
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

  getType(): String {
    return this.type == 0 ? 'Prêt' : new String(this.type);
  }

  getTitle(): String {
    return this.title;
  }

  getId(): String {
    return this.id;
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
