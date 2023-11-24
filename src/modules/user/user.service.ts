import { IOrder, IUser } from './user.interface';
import { UserModel } from './user.model';

// ------------------------>> Create User Service <<------------------------- //
const createUserIntoDB = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};

// ------------------------>> GET All Users Service <<----------------------- //
const getAllUsersFromDB = async (): Promise<IUser[] | []> => {
  const result = await UserModel.find().select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

// -------------------------->> Get User by userId <<-------------------- //
const getUserByUserIdFromDB = async (userId: number): Promise<IUser | null> => {
  const result = await UserModel.findOne({ userId: userId }).select({
    _id: 0,
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
  return result;
};

// --------------------------->> Update User Service <<-------------------------- //
const updateUserByIntoDB = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    userData,
    { new: true },
  ).select({
    _id: 0,
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
  });
  return result;
};

// ------------------------>> Delete User Service <<------------------------- //
const deleteUserFromDB = async (userId: number): Promise<void> => {
  await UserModel.findOneAndDelete({ userId });
};

// ------------------------->> Add Order Service <<------------------------ //
const addOrderIntoDB = async (userId: number, order: IOrder): Promise<void> => {
  await UserModel.addOrder(userId, order);
};

// ---------------------->> Get All Order Of User Service <<----------------- //
const getUserOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }).select({
    _id: 0,
    orders: 1,
  });
  return result;
};

// ---------------->> User Orders Total Price Service <<---------------- //
const getUserOrdersTotalPrice = async (
  userId: number,
): Promise<{ totalPrice: number }> => {
  const result = await UserModel.calculateTotalPrice(userId);
  return { totalPrice: result };
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByUserIdFromDB,
  updateUserByIntoDB,
  deleteUserFromDB,
  addOrderIntoDB,
  getUserOrders,
  getUserOrdersTotalPrice,
};
