import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './config';
import * as cache from "./cache";
import { Position } from '@/contracts/position';

export const checkPhone = (req:Request, res:Response, next:NextFunction) => {
    if (req.body.phone) {
        const {phone} = req.body; 
        const phoneUtil = PhoneNumberUtil.getInstance();
        if(!phone.startsWith('+')) {
            return res.status(400).send({message: 'Phone number should not start with +'});
        }
        else{
            const phoneNumber = phoneUtil.parse(phone, 'ZZ');
            const isValid = phoneUtil.isValidNumber(phoneNumber);
            if (isValid) {
                const formatted = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);
                req.body.phone = formatted;
                next();
            }
            else {
                return res.status(400).send({message: 'Invalid phone number'});
            }
        }
    }
    else{
        next();
    }
}

export const checkEmail = (req:Request, res:Response, next: NextFunction) => {
    const { email } = req.body;
    const emailRegex : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
    if(email && !emailRegex.test(email)){
        return res.status(400).send({message: 'Invalid email'});
    }
    next();
}

export const verifyAccessToken = async (req: Request, res: Response, next : NextFunction) => {
    const authHeader :string = req.headers.authorization? req.headers.authorization : '';
    if(!authHeader){
        return res.status(401).send({message: "No Access Token provided"});
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).send({message: "Invalid Access Token"});
    }
    try{
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const { _id, location } = decodedToken as { _id : string, location: Position };
        if(!_id){
            return res.status(401).send({message: "Invalid Access Token"});
        }
        // check if the access token is in redis
        const cacheTokenClient = cache.generalClientPool;
        const cacheAccessValue = await cache.getFromCache(cacheTokenClient, `access-${_id}`);
        if(!cacheAccessValue || cacheAccessValue !== token){
            return res.status(401).send({message: "Invalid Access Token"});
        }
        req.body.userID = _id;
        req.body.location = location;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message: "Invalid Access Token"});
    }
}


export const verifyRefreshToken = (req: Request, res: Response, next : NextFunction) => {
    const authHeader :string = req.headers.authorization? req.headers.authorization : '';
    if(!authHeader){
        return res.status(401).send({message: "No Access Token provided"});
    }
    const refreshToken = authHeader.split(' ')[1];
    if(!refreshToken){
        return res.status(401).send({message: "Invalid Access Token"});
    }
    try{
        const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const { _id } = decodedToken as { _id : string };
        if(!_id){
            return res.status(401).send({message: "Invalid Refresh Token"});
        }
        req.body.userID = _id;
        req.body.clientRefreshToken = refreshToken;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).send({message: "Invalid Refresh Token"});
    }
}

export const checkPostion = (req: Request, res: Response, next : NextFunction) => {
    const { location } = req.body;
    if(!location.lat || !location.lang){
        return res.status(400).send({message: "Please provide your location"});
    }
    next();
}


export const checkBakerAvailability = async (req: Request, res: Response, next : NextFunction) => {
    const { productId } = req.body;
    const cacheClient = await cache.generalClientPool;
    cache.getFromCache(cacheClient, `baker-${productId}`).then((data) => {
        if(data) {
            return res.status(403).send({message: `Baker is busy, the nearest available time to start baking your order is ${data}, please change the time or choose another baker`});
        }
        next();
    }).catch((err) => {
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    });
}