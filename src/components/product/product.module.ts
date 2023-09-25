import ProductController from './product.controller';
import ProductService from './product.service';
import ProductRouter from './product.router';
import UserService from '../user/user.service';

const userService = new UserService();
const productService = new ProductService(userService);
const productController = new ProductController(productService);
const productRouter = new ProductRouter(productController);

export default {
    service: productService,
    controller: productController,
    router: productRouter.getRouter()
}