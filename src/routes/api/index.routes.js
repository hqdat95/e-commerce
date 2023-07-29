import { Router } from 'express';
import userRouter from './users.routes';
import authRouter from './auth.routes';
import productRouter from './products.routes';
import transportInfosRouter from './transportInfos.routes';
import orderItemsRouter from './orderItems.routes';

const router = Router();

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/products', productRouter);

router.use('/transport_infos', transportInfosRouter);

router.use('/order_items', orderItemsRouter);

export default router;
