import { Router } from 'express';
import OrderController from './order.controller';
import { verifyAccessToken, checkPostion, checkBakerAvailability } from '@/utils/middlewares';

class OrderRouter {
    orderController: OrderController;
    constructor(OrderController: OrderController) {
        this.orderController = OrderController;
    }
    getRouter = () => {
        const router = Router();
        router.post('/create',[verifyAccessToken , checkPostion , checkBakerAvailability] ,this.orderController.create);
        router.get('/get', verifyAccessToken, this.orderController.get);
        router.get('/get/:id', verifyAccessToken ,this.orderController.getById);
        router.put('/update/:id', verifyAccessToken, this.orderController.update);
        router.delete('/delete/:id', verifyAccessToken, this.orderController.delete);
        return router;
    }
}


export default OrderRouter;