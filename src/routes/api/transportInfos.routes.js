import { Router } from 'express';
import asyncHandler from '../../middlewares/async.middleware';
import verifyAccess from '../../middlewares/access.middleware';
import validator from '../../middlewares/validator.middleware';
import transportInfo from '../../validator/transportInfos.validator';
import * as transportInfosCtrl from '../../controllers/transportInfos.controller';

const router = Router();

router.get('/temp', asyncHandler(transportInfosCtrl.getTemp));

router.get('/temp/:id', asyncHandler(transportInfosCtrl.getTempById));

router.post('/temp', validator(transportInfo), asyncHandler(transportInfosCtrl.createTemp));

router.put('/temp/:id', validator(transportInfo), asyncHandler(transportInfosCtrl.updateTemp));

router.delete('/temp/:id', asyncHandler(transportInfosCtrl.deleteTemp));

router.get('/removed', verifyAccess, asyncHandler(transportInfosCtrl.findAllRemoved));

router.get('/removed/:id', verifyAccess, asyncHandler(transportInfosCtrl.findOneRemoved));

router.get('/', verifyAccess, asyncHandler(transportInfosCtrl.findAll));

router.get('/:id', verifyAccess, asyncHandler(transportInfosCtrl.findOne));

router.post('/', validator(transportInfo), verifyAccess, asyncHandler(transportInfosCtrl.create));

router.put('/:id', validator(transportInfo), verifyAccess, asyncHandler(transportInfosCtrl.update));

router.delete('/:id', verifyAccess, asyncHandler(transportInfosCtrl.remove));

router.put('/restore/:id', verifyAccess, asyncHandler(transportInfosCtrl.restore));

export default router;
