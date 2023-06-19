import { Router } from 'express';
import authRouter from './auth.routes';
import productRouter from './products.routes';

const router = Router();

router.use('/auth', authRouter);

router.use('/products', productRouter);

export default router;
