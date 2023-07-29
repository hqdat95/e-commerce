import { Router } from 'express';
import authRouter from './auth.routes';
import categoryRouter from './categories.routes';

const router = Router();

router.use('/auth', authRouter);

router.use('/categories', categoryRouter);

export default router;
