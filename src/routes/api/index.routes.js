import { Router } from 'express';
import authRouter from './auth.routes';
import productImagesRouter from './productImages.routes';

const router = Router();

router.use('/auth', authRouter);

router.use('/product_images', productImagesRouter);

export default router;
