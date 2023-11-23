import z from 'zod';

export const nameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .max(20, 'First name must be less than 20 characters'),
  lastName: z
    .string({
      invalid_type_error: 'Last name must be a string',
      required_error: 'Last name is required',
    })
    .max(20, 'Last name must be less than 20 characters'),
});

export const addressValidationScheme = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
});

export const orderValidationScheme = z.object({
  productName: z.string({
    required_error: 'Product name is required',
    invalid_type_error: 'Product name must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
});

export const userValidationSchema = z.object({
  userId: z.number({
    invalid_type_error: 'User Id must be a number',
    required_error: 'User Id is required',
  }),
  username: z.string({
    invalid_type_error: 'User Name must be a string',
    required_error: 'User Name is required',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(8, 'Password must be minimum 8 characters'),
  fullName: nameValidationSchema,
  age: z.number({
    invalid_type_error: 'Age must be a number',
    required_error: 'Age is required',
  }),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required',
    })
    .email({
      message: 'Email must be a valid email',
    }),
  isActive: z.boolean({
    invalid_type_error: 'Is Active must be a boolean',
    required_error: 'Is Active is required',
  }),
  hobbies: z.array(
    z.string({
      invalid_type_error: 'Hobbies must be an array of strings',
      required_error: 'Hobbies is required',
    }),
  ),
  address: addressValidationScheme,
  orders: z.array(orderValidationScheme).optional(),
});
