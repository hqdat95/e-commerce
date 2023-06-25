import { Router } from 'express';
import * as homeController from '../../controllers/home.controller';
import asyncHandler from '../../middlewares/async.middleware';

const router = Router();

router.get('/', asyncHandler(homeController.homePage));

router.get('/about', asyncHandler(homeController.aboutPage));

export default router;
