import { Router } from 'express';
import cartItem from '../../validator/cartItems.validator';
import asyncHandler from '../../middlewares/async.middleware';
import validator from '../../middlewares/validator.middleware';
import verifyAccess from '../../middlewares/access.middleware';
import * as cartItemsCtrl from '../../controllers/cartItems.controller';

const router = Router();

router.post('/temp', validator(cartItem), asyncHandler(cartItemsCtrl.createTemp));

router.post('/', verifyAccess, validator(cartItem), asyncHandler(cartItemsCtrl.create));

export default router;
