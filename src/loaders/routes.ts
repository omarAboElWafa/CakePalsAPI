import { Express } from 'express';
import userModule from '../components/user/user.module';
import productModule from '../components/product/product.module';
import orderModule from '../components/order/order.module';
import ratingModule from '../components/rating/rating.module';


export default (app : Express) => {
    app.use('/users', userModule.router);
    app.use('/products', productModule.router);
    app.use('/orders', orderModule.router);
    app.use('/ratings', ratingModule.router);
}