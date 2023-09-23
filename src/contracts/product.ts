import {Document, ObjectId} from "mongoose";

export interface IProduct extends Document{
    backerId: ObjectId
    name: string
    description: string
    price: number
    category: string
    avgPreparationTime: number // in minutes
    avgDeliveryTime: number // in days
}

export type ProductInput<T> = Omit<T, keyof Document>;