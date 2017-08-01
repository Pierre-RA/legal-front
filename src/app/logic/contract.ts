import { Serializable } from './serialize';

export class Contract {

  constructor(
    private borrower: Person,
    private lender: Person,
    private loan: Loan
  ) { }

  isSound(): boolean {
    return this.borrower.isSound() &&
      this.lender.isSound() &&
      this.loan.isSound();
  }

  export(): object {
    console.log(
      this.loan.hasGoal + ' ' + this.loan.goal
    );
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

export class Loan implements Serializable<Loan> {
  goal: string;
  hasGoal: boolean;
  hasLent: boolean;
  dateLent: Date;

  constructor(
    private currency?: string,
    private amount?: number,
    private interest?: number,
    goal?: string
  ) {
    this.hasGoal = false;
    if (goal) {
      this.goal = goal;
      this.hasGoal = true;
    }
  }

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

  isSound(): boolean {
    return true;
  }
}

export abstract class Person implements Serializable<Person> {
  constructor(
    protected address: Address,
    protected phone: string,
    protected email: string
  ) {}

  deserialize(input: any) {
    this.address = new Address().deserialize(input.address);
    this.phone = input.phone;
    this.email = input.email;
    return this;
  }

  getTitle(): string {
    return '';
  };

  getName(): string {
    return '';
  };

  getAddress(): Address {
    return this.address;
  };

  getPhone(): string {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }

  isSound(): boolean {
    return false;
  };
}

export class PhysicalPerson extends Person implements Serializable<PhysicalPerson> {

  constructor(
    private firstName: string,
    private lastName: string,
    private isMale: boolean,
    protected address: Address,
    protected phone: string,
    protected email: string
  ) {
    super(address, phone, email);
  }

  deserialize(input: any) {
    super.deserialize(input);
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.isMale = input.isMale;
    return this;
  }

  getCivility(): string {
    if (this.isMale) {
      return "Monsieur";
    }
    return "Madame";
  }

  getAddressPrefix(): string {
    if (this.isMale) {
      return "domicilié";
    }
    return "domiciliée";
  }

  getTitle(): string {
    return this.getCivility() + ' ' +
      this.getName() + ' ' +
      this.getAddressPrefix() + ' ' + this.address;
  }

  v

  isSound(): boolean {
    return true;
  }
}

export class MoralPerson extends Person implements Serializable<MoralPerson> {

  constructor(
    private reason: string,
    protected address: Address,
    protected phone: string,
    protected email: string
  ) {
    super(address, phone, email);
  }

  deserialize(input: any) {
    super.deserialize(input);
    this.reason = input.reason;
    return this;
  }

  getTitle(): string {
    return this.reason + ' sise à ' + this.address;
  }

  getName(): string {
    return this.reason;
  }

  isSound(): boolean {
    return true;
  }
}

export class Address implements Serializable<Address> {

  constructor(
    private line1?: string,
    private line2?: string,
    private line3?: string,
    private postCode?: string,
    private city?: string,
    private province?: string,
    private country?: string,
  ) { }

  deserialize(input: any) {
    this.line1 = input.line1;
    this.line2 = input.line2;
    this.line3 = input.line3;
    this.postCode = input.postCode;
    this.city = input.city;
    this.province = input.province;
    this.country = input.country;
    return this;
  }

  getLine1() {
    return this.line1;
  }

  getLine2() {
    return this.line2;
  }

  getLine3() {
    return this.line3;
  }

  getPostCode() {
    return this.postCode;
  }

  getCity() {
    return this.city;
  }

  getProvince() {
    return this.province;
  }

  getCountry() {
    return this.country;
  }

  getPlace() {
    let result: string;
    result = '';
    result += this.postCode ? this.postCode : '';
    result += this.city ? ' - ' + this.city : '';
    result += this.province ? ' - ' + this.province : '';
  }

  toString(): string {
    let result: string;
    result = '';
    result += this.line1 ? this.line1 : '';
    result += this.line2 ? ', ' + this.line2 : '';
    result += this.line3 ? ', ' + this.line3 : '';
    result += this.postCode ? ', ' + this.postCode : '';
    result += this.city ? ', ' + this.city : '';
    result += this.province ? ', ' + this.province : '';
    result += this.country ? ', ' + this.country : '';
    return result;
  }
}
