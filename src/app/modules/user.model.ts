import { Schema, model } from 'mongoose';
import { Address, FullName, User } from './user.interface';
import bcrypt from 'bcrypt'

const userFullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First Name Required'],
    maxlength: [20, 'First Name can not be more than 20 characters'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in campitalize format',
    },
  },
  lastName: { type: String, required: [true, 'Last Name Required'] },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: [true, 'Street  is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Full Name is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'Product name is required'],
      },
      price: { type: Number, required: [true, 'Price is required'] },
      quantity: { type: Number, required: [true, 'Quantity is required'] },
    },
  ],
});

userSchema.pre("save", function (next) {
  const hidePassword = bcrypt.hashSync(this.password, 15);
  this.password = hidePassword;
  next();
});
userSchema.set("toJSON", {
  transform: function (doc, rec) {
    delete rec.password;
  },
});

export const UserModel = model<User>('User', userSchema);
