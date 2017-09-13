import { Serializable } from '../logic/serialize';

export abstract class AbstractContract implements Serializable<AbstractContract> {

  id: string;
  type: number;
  title: string;
  owner: string;
  date: Date;
  place: string;

  constructor(type: number) {
    this.type = type;
  }

  deserialize(input: any): this {
    this.id = input._id;
    this.title = input.title;
    this.owner = input.owner;
    this.date = input.date;
    this.place = input.place;
    return this;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getType(): string {
    switch(this.type) {
      case 0:
        return 'Prêt';
      default:
        return 'Inconnu';
    }
  }

}
