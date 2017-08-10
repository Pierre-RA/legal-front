export interface ILoan {
  goal: string;
  hasGoal: boolean;
  hasLent: boolean;
  currency: string;
  amount: number;
  interest: number;
  payoff: Array<IPayoff>;
}

export interface IPayoff {
  date: string;
  amount: number;
}
