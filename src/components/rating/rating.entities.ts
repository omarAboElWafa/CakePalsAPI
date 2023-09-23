import { IRating } from "@/contracts/rating";
import mongoose, { Schema } from "mongoose";

const  RatingSchema : Schema  = new Schema({});



export default mongoose.model<IRating>('Rating', RatingSchema);