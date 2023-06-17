import { userSchema } from './users.validator';
import { transportInfoSchema } from './transportInfos.validator';
import { categorySchema } from './categories.validator';
import { productSchema } from './products.validator';
import { productImageSchema } from './productImages.validator';
import { orderSchema } from './orders.validator';
import { orderItemSchema } from './orderItems.validator';
import { paymentSchema } from './payments.validator';
import { cartItemSchema } from './cartItems.validator';
import { productWishlistSchema } from './productWishlists.validator';

import { loginSchema, passwordSchema } from './auth.validator';

export default {
  loginSchema,
  passwordSchema,
  userSchema,
  transportInfoSchema,
  categorySchema,
  productSchema,
  productImageSchema,
  orderSchema,
  orderItemSchema,
  paymentSchema,
  cartItemSchema,
  productWishlistSchema,
};
