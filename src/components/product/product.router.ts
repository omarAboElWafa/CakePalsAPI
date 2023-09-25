import { Router } from 'express';
import ProductController from './product.controller';
import { verifyAccessToken, checkPostion } from '@/utils/middlewares';

class ProductRouter {
    productController: ProductController;
    constructor(ProductController: ProductController) {
        this.productController = ProductController;
    }
    getRouter = () => {
        // TODO: Add the middlewares
        const router = Router();
        router.post('/create', verifyAccessToken, this.productController.create);
        router.get('/get', this.productController.get);
        router.get('/get/:id', this.productController.getById);
        router.put('/update/:id', verifyAccessToken ,this.productController.update);
        router.delete('/delete/:id', verifyAccessToken ,this.productController.delete);
        // search near by baker's products (pagination)
        router.get('/search', [ verifyAccessToken ] , this.productController.search);
        return router;
    }
}


export default ProductRouter;