export interface IContact {
  _id: string,
  type: string,
  email: string,
  phone: IPhone,
  firstName: string,
  lastName: string,
  reason: string,
  isMale: boolean,
  address: {
    line1: string,
    line2: string,
    line3: string,
    postCode: string,
    city: string,
    province: string,
    country: string
  }
};

export interface IPhone {
  country: string,
  phone: string,
}
