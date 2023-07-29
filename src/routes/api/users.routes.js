import { Router } from 'express';
import user from '../../validator/users.validator';
import asyncHandler from '../../middlewares/async.middleware';
import validator from '../../middlewares/validator.middleware';
import * as userController from '../../controllers/users.controller';

const router = Router();

router.get('/removed', asyncHandler(userController.findAllWithRemoved));

router.get('/removed/:id', asyncHandler(userController.findOneWithRemoved));

router.get('/', asyncHandler(userController.findAll));

router.get('/:id', asyncHandler(userController.findOne));

router.post('/', validator(user), asyncHandler(userController.signup));

router.put('/:id', validator(user), asyncHandler(userController.update));

router.delete('/:id', asyncHandler(userController.remove));

router.put('/restore/:id', asyncHandler(userController.restore));

export default router;
