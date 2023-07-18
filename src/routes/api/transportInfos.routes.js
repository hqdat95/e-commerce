import { Router } from 'express';
import asyncHandler from '../../middlewares/async.middleware';
import verifyAccess from '../../middlewares/access.middleware';
import validator from '../../middlewares/validator.middleware';
import transportInfo from '../../validator/transportInfos.validator';
import * as transportInfosCtrl from '../../controllers/transportInfos.controller';

const router = Router();

router.get('/removed', verifyAccess, asyncHandler(transportInfosCtrl.findAllRemoved));

router.get('/removed/:id', verifyAccess, asyncHandler(transportInfosCtrl.findOneRemoved));

router.get('/', verifyAccess, asyncHandler(transportInfosCtrl.findAll));

router.get('/:id', verifyAccess, asyncHandler(transportInfosCtrl.findOne));

router.post('/', validator(transportInfo), verifyAccess, asyncHandler(transportInfosCtrl.create));

router.put('/:id', validator(transportInfo), verifyAccess, asyncHandler(transportInfosCtrl.update));

export default router;
