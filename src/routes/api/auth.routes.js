import { Router } from 'express';
import asyncHandler from '../../middlewares/async.middleware';
import * as authController from '../../controllers/auth.controller';
import verifyAccess from '../../middlewares/access.middleware';
import verifyRefresh from '../../middlewares/refresh.middleware';
import verifyPassword from '../../middlewares/password.middleware';
import { localLogin, handlePassword } from '../../middlewares/validator.middleware';

const router = Router();

router.post('/login', localLogin, verifyRefresh, asyncHandler(authController.login));

router.post('/password', handlePassword, verifyPassword, verifyAccess, asyncHandler(authController.handlePassword));

router.get('/google', asyncHandler(authController.getGoogleAuthUrl));

router.post('/logout', verifyAccess, asyncHandler(authController.logout));

export default router;
