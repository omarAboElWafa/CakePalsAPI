import { Router } from 'express';
import RatingController from './rating.controller';

class RatingRouter {
    ratingsController: RatingController;
    constructor(RatingController: RatingController) {
        this.ratingsController = RatingController;
    }

    getRouter = () => {
        const router = Router();
        router.post('/create', this.ratingsController.create);
        // TODO: get all my ratings
        router.get('/get', this.ratingsController.get);
        router.get('/get/:id', this.ratingsController.getById);
        router.put('/update/:id', this.ratingsController.update);
        router.delete('/delete/:id', this.ratingsController.delete);

        router.get('/getAverageRating/:id', this.ratingsController.getAverageRating);

        return router;
    }


}


export default RatingRouter;