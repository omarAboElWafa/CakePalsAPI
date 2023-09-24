import { IRating } from "@/contracts/rating";
import mongoose, { Schema } from "mongoose";

const  RatingSchema : Schema  = new Schema({
    bakeryId: {
        type: Schema.Types.ObjectId,
        ref: 'Bakery',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    }

});



export default mongoose.model<IRating>('Rating', RatingSchema);