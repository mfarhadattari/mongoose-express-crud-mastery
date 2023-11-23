import { Model } from 'mongoose';

export interface IName {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrder[];
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(userId: number): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  addOrder(userId: number, Order: IOrder): Promise<void>;
}
