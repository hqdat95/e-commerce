import { Router } from 'express';
import productRouter from './products.routes';

const router = Router();

router.use('/products', productRouter);

export default router;
