import { Router } from 'express';
import uploadAny from '../../middlewares/upload.middleware';
import asyncHandler from '../../middlewares/async.middleware';
import * as productImagesController from '../../controllers/productImages.controller';

const router = Router();

router.get('/', asyncHandler(productImagesController.findAll));

router.get('/removed', asyncHandler(productImagesController.findWithRemoved));

router.get('/:productId', asyncHandler(productImagesController.findImages));

router.post('/:productId', uploadAny, asyncHandler(productImagesController.upload));

router.put('/:productId', uploadAny, asyncHandler(productImagesController.update));

router.delete('/:productId', asyncHandler(productImagesController.remove));

router.post('/restore/:productId', asyncHandler(productImagesController.restore));

export default router;
