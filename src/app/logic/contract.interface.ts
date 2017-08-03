import { IContact } from './contact.interface';
import { ILoan } from './loan.interface';

export interface IContract {
  borrower: IContact;
  lender: IContact;
  loan: ILoan;
  type: Number;
  title: String;
}
