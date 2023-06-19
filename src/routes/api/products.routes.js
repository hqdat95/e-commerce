import { Router } from 'express';
import * as productController from '../../controllers/products.controller';

const router = Router();

router.get('/search', productController.search);

router.get('/category/:categoryId', productController.findByCategory);

router.get('/', productController.findAll);

router.get('/active', productController.findAllActive);

router.get('/removed', productController.findAllRemoved);

router.get('/:id', productController.findById);

router.get('/removed/:id', productController.findRemoved);

router.post('/', productController.create);

router.put('/:id', productController.update);

router.delete('/:id', productController.remove);

router.put('/restore/:id', productController.restore);

export default router;
