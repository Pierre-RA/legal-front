import { Serializable } from './serialize';

export class Contact implements Serializable<Contact> {
  _id: string;
  type: string;
  email: string;
  phone: Phone;
  firstName: string;
  lastName: string;
  reason: string;
  gender: string;
  address: Address;
  constructor() {}

  deserialize(input: any): this {
    this._id = input._id;
    this.address = new Address().deserialize(input.address);
    this.phone = input.phone ? new Phone().deserialize(input.phone) : null;
    this.email = input.email;
    this.type = input.type;
    if (this.type === 'physical') {
      this.lastName = input.lastName;
      this.firstName = input.firstName;
      this.gender = input.gender;
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
    if (this.gender == 'male') {
      return 'Monsieur';
    }
    if (this.gender == 'female') {
      return 'Madame';
    }
    return 'N/A';
  }

  getAddressPrefix(): string {
    if (this.gender == 'male') {
      return 'domicilié';
    }
    if (this.gender == 'female') {
      return 'domiciliée';
    }
    return 'N/A';
  }

  getName(): string {
    return this.type === 'physical' ? this.firstName + ' ' + this.lastName : this.reason;
  }

  getPhone(): Phone {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }

  getType(): string {
    return this.type;
  }

  getId(): string {
    return this._id;
  }

  getGender(): string {
    return this.gender;
  }

  static getDefaultContact(type: string): Contact {
    return new Contact().deserialize({
      _id: '',
      type: type,
      email: '',
      phone: {
        country: '',
        phone: '',
      },
      isMale: null,
      firstName: '',
      lastName: '',
      reason: '',
      address: {
        line1: '',
        line2: '',
        line3: '',
        postCode: '',
        city: '',
        province: '',
        country: ''
      }
    });
  }

  static getContactList(input: Array<any>): Array<Contact> {
    let result: Array<Contact> = [];
    input.forEach(item => {
      result.push(new Contact().deserialize(item));
    });
    return result;
  }
}

export class Phone implements Serializable<Phone> {
  country: string;
  phone: string;

  constructor() {}

  deserialize(input: any) {
    this.country = input.country || '';
    this.phone = input.phone;
    return this;
  }
}

export class Address implements Serializable<Address> {

  line1: string;
  line2: string;
  line3: string;
  postCode: string;
  city: string;
  province: string;
  country: string;

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
    return result;
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
