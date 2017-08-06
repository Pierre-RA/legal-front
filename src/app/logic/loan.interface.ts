export interface ILoan {
  goal: string;
  hasGoal: boolean;
  hasLent: boolean;
  currency: string;
  amount: number;
  interest: number;
  datePayoff: string;
  amountPayoff: number;
}
