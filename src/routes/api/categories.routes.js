import { Router } from 'express';
import category from '../../validator/categories.validator';
import validator from '../../middlewares/validator.middleware';
import asyncHandler from '../../middlewares/async.middleware';
import * as categoryController from '../../controllers/categories.controller';

const router = Router();

router.get('/removed', asyncHandler(categoryController.findAllWithRemoved));

router.get('/removed/:id', asyncHandler(categoryController.findOneWithRemoved));

router.get('/', asyncHandler(categoryController.findAll));

router.get('/:id', asyncHandler(categoryController.findOne));

router.post('/', validator(category), asyncHandler(categoryController.create));

router.put('/:id', validator(category), asyncHandler(categoryController.update));

router.delete('/:id', asyncHandler(categoryController.remove));

router.put('/restore/:id', asyncHandler(categoryController.restore));

export default router;
