import { Serializable } from './serialize';
import { IContact } from './contact.interface';

export default class Contact implements IContact, Serializable<Contact> {
  _id: String;
  type: String;
  email: String;
  phone: String;
  firstName: String;
  lastName: String;
  reason: String;
  isMale: Boolean;
  address: Address;
  constructor() {}

  deserialize(input: any): this {
    this._id = input._id;
    this.address = new Address().deserialize(input.address);
    this.phone = input.phone;
    this.email = input.email;
    this.type = input.type;
    if (this.type === 'physical') {
      this.lastName = input.lastName;
      this.firstName = input.firstName;
      this.isMale = input.isMale;
    } else {
      this.reason = input.reason;
    }
    return this;
  }

  getAddress(): Address {
    return this.address;
  }

  getTitle(): string {
    return this.type === 'physical' ? this.getPhysicalTitle() : this.getMoralTitle();
  }

  getPhysicalTitle(): string {
    return this.getCivility() + ' ' +
      this.getName() + ' ' +
      this.getAddressPrefix() + ' ' + this.address;
  }

  getMoralTitle(): string {
    return this.reason + ' sise à ' + this.address;
  }

  getCivility(): string {
    return this.isMale ? 'Monsieur' : 'Madame';
  }

  getAddressPrefix(): String {
    return this.isMale ? 'domicilié' : 'domiciliée';
  }

  getName(): String {
    return this.type === 'physical' ? this.firstName + ' ' + this.lastName : this.reason;
  }

  getPhone(): String {
    return this.phone;
  }

  getEmail(): String {
    return this.email;
  }

  getType(): String {
    return this.type;
  }

  getId(): String {
    return this._id;
  }
}

export class Address implements Serializable<Address> {

  line1: String;
  line2: String;
  line3: String;
  postCode: String;
  city: String;
  province: String;
  country: String;

  constructor() { }

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
