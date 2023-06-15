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

export default {
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
