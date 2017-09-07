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
  };

  isValidEmail(): boolean {
    return true;
  }
}
