import { z } from 'zod'

const orderValidation = z.object({
  productName: z.string().trim(),
  price: z.number().min(0),
  quantity: z.number().min(0),
})

const userValidation = z.object({
  userId: z.number(),
  username: z
    .string()
    .min(4, { message: 'Username at least 4 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password at least 6 characters' }),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().min(18, { message: 'Age at least 18' }),
  email: z.string().email({ message: 'Email address not found' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(orderValidation).optional(),
})

export { userValidation, orderValidation }