import {Document, ObjectId} from "mongoose";

export interface IRating extends Document{
    bakerId: ObjectId
    clientId: ObjectId
    rating: number
    comment: string
}

export type RatingInput<T> = Omit<T, keyof Document>;