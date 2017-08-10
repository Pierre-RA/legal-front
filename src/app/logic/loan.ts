import { ILoan, IPayoff } from './loan.interface';
import { Serializable } from './serialize';
import { currencies } from './currencies';

export class Loan implements ILoan, Serializable<Loan> {
  goal: string;
  hasGoal: boolean;
  hasLent: boolean;
  currency: string;
  amount: number;
  interest: number;
  payoff: Array<Payoff>;
  length: Date;
  extendNegotiationDate: Date;
  silentDate: Date;
  dateLent: Date;

  constructor() {}

  deserialize(input: any) {
    this.currency = input.currency;
    this.amount = input.amount;
    this.interest = input.interest;
    this.hasGoal = input.hasGoal;
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

  getCurrency() {
    let result = 's';
    currencies.forEach(currency => {
      if (currency.code == this.currency) {
        result = currency.plural;
      }
    });
    return result;
  }

  getTotalAmount() {
    let result = 0;
    this.payoff.forEach(item => {
      result += item.amount;
    });
    return result;
  }
}

export class Payoff implements IPayoff, Serializable<Payoff> {
  date: string;
  amount: number;

  deserialize(input: any) {
    this.date = input.date;
    this.amount = input.amount;
    return this;
  }
}
