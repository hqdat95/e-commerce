import { Router } from 'express';
import product from '../../validator/products.validator';
import validator from '../../middlewares/validator.middleware';
import asyncHandler from '../../middlewares/async.middleware';
import * as productController from '../../controllers/products.controller';

const router = Router();

router.get('/search', asyncHandler(productController.search));

router.get('/category/:categoryId', asyncHandler(productController.findByCategoryId));

router.get('/removed', asyncHandler(productController.findAllWithRemoved));

router.get('/removed/:id', asyncHandler(productController.findOneWithRemoved));

router.get('/', asyncHandler(productController.findAll));

router.get('/:id', asyncHandler(productController.findOne));

router.post('/', validator(product), asyncHandler(productController.create));

router.put('/:id', validator(product), asyncHandler(productController.update));

router.delete('/:id', asyncHandler(productController.remove));

router.post('/restore/:id', asyncHandler(productController.restore));

export default router;
