import { Request, Response } from 'express';
import OrderService from './order.service';
import { IOrder, OrderInput } from '@/contracts/order';
import * as cache from '@/utils/cache';


class OrderController {
    orderService: OrderService;
    constructor(OrderService: OrderService) {
        this.orderService = OrderService;
    }
    
    create = async (req: Request, res: Response) => {
        const orderInput: OrderInput<IOrder> = req.body;
        const order: IOrder = await this.orderService.create(orderInput);
        if(order){
            // cache the order end date in redis
            const cacheOrderClient = cache.generalClientPool;
            const cacheOrderValue = await cache.setToCache(cacheOrderClient, `baker-${order.userId}`, order.expectedDeliveryDate.toISOString(), 60);
            if(cacheOrderValue){
                res.status(201).json({ order });
            }
            else{
                res.status(500).json({ message: "Internal Server Error" });
            }
        } else{
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // get all my orders as a baker or a customer
    get = async (req: Request, res: Response) => {
        const { userID } = req.body;
        const orders: IOrder[] = await this.orderService.get(userID);
        res.status(200).json({ orders });
    }


    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userID } = req.body;
        const order = await this.orderService.getById(id, userID);
        res.status(200).json({ order });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userID } = req.body;
        const orderInput: OrderInput<IOrder> = req.body;
        const storedOrder = await this.orderService.getById(id, userID);
        if(storedOrder) {
            const orderOwnerId = storedOrder.userId;
            if(orderOwnerId.toString() !== userID){
                return res.status(403).send({message: "You are not allowed to update this order"});
            }
        }
        const order = await this.orderService.update(id, orderInput);
        res.status(200).json({ order });
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userID } = req.body;
        const storedOrder = await this.orderService.getById(id, userID);
        if(storedOrder) {
            const orderOwnerId = storedOrder.userId;
            if(orderOwnerId.toString() !== userID){
                return res.status(403).send({message: "You are not allowed to delete this order"});
            }
        }
        const order = await this.orderService.delete(id, userID);
        res.status(200).json({ order });
    }
}


export default OrderController;