import { ILoan } from './loan.interface';
import { Serializable } from './serialize';
import { currencies } from './currencies';

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

  getCurrency() {
    let result = 's';
    currencies.forEach(currency => {
      if (currency.code == this.currency) {
        result = currency.plural;
      }
    });
    return result;
  }
}
