import {Document} from "mongoose";

export interface IUser extends Document{
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    address: {
        district: string,
        city: string,
        country: string,
    },
    verifiedEmail: boolean,
    verifiedPhone: boolean,
    role: string,
}

export type UserInput<T> = Omit<T, keyof Document>;