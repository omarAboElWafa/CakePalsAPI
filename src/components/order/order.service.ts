import { ObjectId } from 'mongoose';
import userEntities from '../user/user.entities';
import  Order from './order.entities';
import { IOrder, OrderInput } from '@/contracts/order';

class OrderService {
    create = async (order: OrderInput<IOrder>) => {
        try{
            const newOrder = new Order(order);
            return await newOrder.save();
        } catch(error){
            throw error;
        }
    }

    get = async (userID : string) => {
        try {
            return await Order.find(
                { $or: [{ userId: userID }, { bakerId: userID }] }
            ).lean();
        } catch (error) {
            throw error;
        }
    }

    getById = async (id: string, userID: string) => {
        try{
            return await Order.findOne({
                $and: [{ _id: id }, { $or: [{ userId: userID }, { bakerId: userID }] }]
            }).lean();
        } catch(error){
            throw error;
        }
    }

    update = async (id: string, order: OrderInput<IOrder>) => {
        try{
            return await Order.findByIdAndUpdate(id, order, { new: true }).lean();
        } catch(error){
            throw error;
        }
    }

    delete = async (id: string, userID: string) => {
        try{
            return await Order.findByIdAndDelete(id).lean();
        } catch(error){
            throw error;
        }
    }
}
export default OrderService;