import OrderController from './order.controller';
import OrderService from './order.service';
import OrderRouter from './order.router';

const orderService = new OrderService();
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);

export default {
    service: orderService,
    controller: orderController,
    router: orderRouter.getRouter()
}