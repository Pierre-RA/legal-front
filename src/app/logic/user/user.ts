import { Serializable } from '../serialize';

export class User implements Serializable<User> {
  email: string;
  password: string;
  name: string;
  id: number;
  isAdmin: boolean;

  constructor() {}

  deserialize(input: any): this {
    this.email = input.email;
    this.password = input.password || '';
    this.name = input.name;
    this.id = input.id;
    this.isAdmin = input.isAdmin || false;
    return this;
  };

  isValidEmail(): boolean {
    return true;
  }
}
