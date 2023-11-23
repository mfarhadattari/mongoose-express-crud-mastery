import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IAddress, IName, IOrder, IUser, IUserModel } from './user.interface';

// ------------------->> Creating Name Schema <<------------------- //
const nameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// ------------------->> Creating Address Schema <<------------------- //
const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// ------------------->> Creating Order Schema <<------------------- //
const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// ------------------->> Creating User Schema <<------------------- //
const userSchema = new Schema<IUser, IUserModel>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: nameSchema,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orders: {
      type: [orderSchema],
      default: [],
    },
  },
  {
    toJSON: {
      transform: function (doc, transformedDoc) {
        delete transformedDoc.password;
        return transformedDoc;
      },
    },
  },
);

// ------------------->> save hashing passwords into database <<--------------------
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hashPassword) {
    if (err) {
      throw new Error(err.message);
    }
    user.password = hashPassword;
    next();
  });
});

// --------------------->> User Statics <<------------------------
userSchema.statics.isUserExist = async function (userId) {
  const result = await UserModel.findOne({ userId: userId });
  return result === null ? false : true;
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);
