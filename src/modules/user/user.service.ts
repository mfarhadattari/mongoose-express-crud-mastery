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
    email: 1,
    age: 1,
    address: 1,
  });
  return result;
};

// -------------------------->> Get User by userId <<-------------------- //
const getUserByUserIdFromDB = async (userId: number): Promise<IUser | null> => {
  const result = await UserModel.findOne({ userId: userId });
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
  );
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

// ------------------------->> Get All Order Of User <<----------------- //
const getUserOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId }).select({
    orders: 1,
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByUserIdFromDB,
  updateUserByIntoDB,
  deleteUserFromDB,
  addOrderIntoDB,
  getUserOrders,
};
