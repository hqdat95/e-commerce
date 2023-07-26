import { Router } from 'express';
import authRouter from './auth.routes';
import productRouter from './products.routes';
import cartItemRouter from './cartItem.routes';

const router = Router();

router.use('/auth', authRouter);

router.use('/products', productRouter);

router.use('/cart_items', cartItemRouter);

export default router;
