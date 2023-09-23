import { IProduct } from "@/contracts/product";
import mongoose, { Schema } from "mongoose";

const  ProductSchema : Schema  = new Schema({});



export default mongoose.model<IProduct>('Product', ProductSchema);