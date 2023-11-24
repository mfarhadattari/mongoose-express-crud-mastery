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
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hashPassword) {
    if (err) {
      throw new Error(err.message);
    }
    user.password = hashPassword;
    next();
  });
});

// --------------------->> Is User Exist Static <<------------------------
userSchema.statics.isUserExist = async function (userId) {
  const result = await UserModel.findOne({ userId: userId });
  return result === null ? false : true;
};

// ---------------------->> Add Order Static <<--------------------------
userSchema.statics.addOrder = async function (userId, order) {
  const user = await UserModel.findOne({ userId: userId });
  if (user) {
    if (!user.orders) {
      user.orders = [];
    }
    user.orders.push(order);
    await user.save();
  }
};

// ----------------------->> Calculate Orders Price Static <-----------------
userSchema.statics.calculateTotalPrice = async function (userId) {
  const result = await UserModel.aggregate([
    {
      $match: { userId: userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);
  return result[0]?.totalPrice || 0;
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);
