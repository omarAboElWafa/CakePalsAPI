import { Router } from 'express';
import OrderController from './order.controller';

class OrderRouter {
    orderController: OrderController;
    constructor(OrderController: OrderController) {
        this.orderController = OrderController;
    }
    getRouter = () => {
        // TODO: Add the middlewares
        const router = Router();
        router.post('/create', this.orderController.create);
        router.get('/get', this.orderController.get);
        router.get('/get/:id', this.orderController.getById);
        router.put('/update/:id', this.orderController.update);
        router.delete('/delete/:id', this.orderController.delete);
        return router;
    }
}


export default OrderRouter;