import { Router } from 'express';

const router = Router();

import * as homeController from '../../controllers/home.controller';

router.get('/', homeController.homePage);

router.get('/about', homeController.aboutPage);

export default router;
