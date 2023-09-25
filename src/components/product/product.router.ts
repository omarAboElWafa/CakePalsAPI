import { Router } from 'express';
import ProductController from './product.controller';

class ProductRouter {
    productController: ProductController;
    constructor(ProductController: ProductController) {
        this.productController = ProductController;
    }
    getRouter = () => {
        // TODO: Add the middlewares
        const router = Router();
        router.post('/create', this.productController.create);
        router.get('/get', this.productController.get);
        router.get('/get/:id', this.productController.getById);
        router.put('/update/:id', this.productController.update);
        router.delete('/delete/:id', this.productController.delete);
        // search near by baker's products (pagination)
        router.get('/search', this.productController.search);
        return router;
    }
}


export default ProductRouter;