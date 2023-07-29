import { Router } from 'express';
import orderItem from '../../validator/orderItems.validator';
import asyncHandler from '../../middlewares/async.middleware';
import validator from '../../middlewares/validator.middleware';
import * as orderItemsCtrl from '../../controllers/orderItems.controller';

const router = Router();

router.get('/removed', asyncHandler(orderItemsCtrl.findAllWithRemoved));

router.get('/removed/order/:orderId', asyncHandler(orderItemsCtrl.findAllWithRemovedByOrderId));

router.get('/removed/:id', asyncHandler(orderItemsCtrl.findOneWithRemoved));

router.get('/', asyncHandler(orderItemsCtrl.findAll));

router.get('/order/:orderId', asyncHandler(orderItemsCtrl.findAllByOrderId));

router.get('/:id', asyncHandler(orderItemsCtrl.findOne));

router.post('/', validator(orderItem), asyncHandler(orderItemsCtrl.create));

router.put('/:id', validator(orderItem), asyncHandler(orderItemsCtrl.update));

router.delete('/:id', asyncHandler(orderItemsCtrl.remove));

router.put('/restore/:id', asyncHandler(orderItemsCtrl.restore));

export default router;
