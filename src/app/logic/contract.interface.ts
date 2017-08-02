import { IContact } from './contact.interface';

export interface IContract {
  borrower: IContact;
  lender: IContact;
  loan: ILoan;
  type: Number;
}

export interface ILoan {
  goal: String;
  hasGoal: Boolean;
  hasLent: Boolean;
  dateLent: Date;
  currency: String;
  amount: Number;
  interest: Number;
}