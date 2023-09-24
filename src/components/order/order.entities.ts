import { IOrder } from "@/contracts/order";
import mongoose, { Schema } from "mongoose";

const  OrderSchema : Schema  = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['In Progress', 'Delivered'],
        default: 'In Progress'        
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    expectedDeliveryDate: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model<IOrder>('Order', OrderSchema);