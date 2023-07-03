import { Router } from 'express';
import asyncHandler from '../../middlewares/async.middleware';
import * as productController from '../../controllers/products.controller';
import { productCreate, productUpdate } from '../../middlewares/validator.middleware';

const router = Router();

router.get('/', asyncHandler(productController.find));

router.get('/removed', asyncHandler(productController.findWithRemoved));

router.post('/', productCreate, asyncHandler(productController.create));

router.put('/', productUpdate, asyncHandler(productController.update));

router.delete('/', asyncHandler(productController.remove));

router.post('/restore', asyncHandler(productController.restore));

export default router;
