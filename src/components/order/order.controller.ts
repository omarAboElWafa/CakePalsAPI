import { Request, Response } from 'express';
import OrderService from './order.service';
import { IOrder, OrderInput } from '@/contracts/order';

class OrderController {
    orderService: OrderService;
    constructor(OrderService: OrderService) {
        this.orderService = OrderService;
    }
    
    create = async (req: Request, res: Response) => {
        const orderInput: OrderInput<IOrder> = req.body;
        const order: IOrder = await this.orderService.create(orderInput);
        res.status(201).json({ order });
    }

    get = async (req: Request, res: Response) => {
        const orders: IOrder[] = await this.orderService.get();
        res.status(200).json({ orders });
    }

    getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const order = await this.orderService.getById(id);
        res.status(200).json({ order });
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const orderInput: OrderInput<IOrder> = req.body;
        const order = await this.orderService.update(id, orderInput);
        res.status(200).json({ order });
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const order = await this.orderService.delete(id);
        res.status(200).json({ order });
    }
}


export default OrderController;