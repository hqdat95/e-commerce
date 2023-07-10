import { Router } from 'express';

const router = Router();

import authRouter from './auth.routes';

router.use('/auth', authRouter);

export default router;
