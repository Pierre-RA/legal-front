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
    this.id = input._id || null;
    if (input.borrower) {
      this.borrower = new Contact().deserialize(input.borrower);
    }
    if (input.lender) {
      this.lender = new Contact().deserialize(input.lender);
    }
    if (input.loan) {
      this.loan = new Loan().deserialize(input.loan);
    }
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

  getExportTitle(): String {
    return this.title + '.docx';
  }

  getId(): String {
    return this.id;
  }
}
