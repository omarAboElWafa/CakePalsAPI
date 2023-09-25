import ProductController from './product.controller';
import ProductService from './product.service';
import ProductRouter from './product.router';

const productService = new ProductService();
const productController = new ProductController(productService);
const productRouter = new ProductRouter(productController);

export default {
    service: productService,
    controller: productController,
    router: productRouter.getRouter()
}