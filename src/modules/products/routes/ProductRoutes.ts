import { Router } from 'express';
import ProductControllers from '../controllers/ProductsControllers';
import { createProductSchema, idParamsValidation, updateProductSchema } from '../schemas/ProductSchemas';

const productsRouter = Router();
const productController = new ProductControllers();

productsRouter.get('/', productController.index);
productsRouter.get('/:id', idParamsValidation, productController.show);
productsRouter.post('/', createProductSchema, productController.create);
productsRouter.put('/:id', updateProductSchema, productController.update);
productsRouter.delete('/:id', idParamsValidation, productController.delete);

export default productsRouter;
