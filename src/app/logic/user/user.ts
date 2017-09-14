import * as base64 from 'base-64';

import { Serializable } from '../serialize';

export class User implements Serializable<User> {
  email: string;
  password: string;
  name: string;
  id: number;
  isAdmin: boolean;
  image: string;

  constructor() {}

  deserialize(input: any): this {
    this.email = input.email;
    this.password = input.password || '';
    this.name = input.name;
    this.id = input.id;
    this.isAdmin = input.isAdmin || false;
    this.image = input.image || 'unknown.png';
    return this;
  }

  getLoginCredentials() {
    return {
      email: this.email,
      password: this.password
    }
  }

  static getScramble(email: string, password: string) {
    return base64.encode(email) + '#' + base64.encode(password);
  }

  static decode(text: string) {
    let array = text.split('#');
    return {
      email: base64.decode(array[0]),
      password: base64.decode(array[1])
    };
  }
}
