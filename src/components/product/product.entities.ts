import { IProduct } from "@/contracts/product";
import mongoose, { Schema } from "mongoose";

const  ProductSchema : Schema  = new Schema({
    bakerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 500,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    avgPrepTime: {
        type: Number,
        min: 0,
        required: true
    }
});

// _id : ObjectId
// bakerId: ObjectId //refrence to user
// name: String
// description: String
// price: Number
// avgPrepTime: Number //In Minutes
// avgDeliveryTime: Number //In Day

export default mongoose.model<IProduct>('Product', ProductSchema);