import { Router } from 'express';
import ProductControllers from '../controllers/ProductsControllers';

const productsRouter = Router();
const productController = new ProductControllers();

productsRouter.get('/', productController.index);
productsRouter.get('/:id', productController.show);
productsRouter.post('/', productController.create);
productsRouter.put('/:id', productController.update);
productsRouter.delete('/:id', productController.delete);

export default productsRouter;
