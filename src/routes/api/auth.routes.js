import { Router } from 'express';
import asyncHandler from '../../middlewares/async.middleware';
import * as authController from '../../controllers/auth.controller';
import verifyAccess from '../../middlewares/access.middleware';
import verifyRefresh from '../../middlewares/refresh.middleware';
import verifyPassword from '../../middlewares/password.middleware';
import login from '../../validator/login.validator';
import password from '../../validator/password.validator';
import validator from '../../middlewares/grantType.middleware';

const router = Router();

router.post('/login', validator(login), verifyRefresh, asyncHandler(authController.login));

router.post(
  '/password',
  validator(password),
  verifyPassword,
  verifyAccess,
  asyncHandler(authController.handlePassword),
);

router.get('/google', asyncHandler(authController.getGoogleAuthUrl));

router.post('/logout', verifyAccess, asyncHandler(authController.logout));

export default router;
