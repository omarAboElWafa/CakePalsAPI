import { IOrder } from "@/contracts/order";
import mongoose, { Schema } from "mongoose";

const  OrderSchema : Schema  = new Schema({});



export default mongoose.model<IOrder>('Order', OrderSchema);