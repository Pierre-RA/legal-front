export class User {
  email: string;
  password: string;
  name: string;
  id: number;

  constructor(email?: string, password?: string) {
    this.email = email || '';
    this.password = password || '';
  }

  isValidEmail(): boolean {
    return true;
  }
}

export class SimpleUser {
  name: string;

  constructor(name?: string) {
    this.name = name || 'unknown';
  }
}
