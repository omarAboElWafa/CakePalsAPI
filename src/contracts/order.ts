import {Document, ObjectId} from "mongoose";

export interface IOrder extends Document{
    productId: ObjectId
    userId: ObjectId
    status: string
    orderDate: Date
    expectedDeliveryDate: Date
}

export type OrderInput<T> = Omit<T, keyof Document>;