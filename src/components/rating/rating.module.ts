import RatingController from './rating.controller';
import RatingService from './rating.service';
import RatingRouter from './rating.router';

const ratingService = new RatingService();
const ratingController = new RatingController(ratingService);
const ratingRouter = new RatingRouter(ratingController);

export default {
    service: ratingService,
    controller: ratingController,
    router: ratingRouter.getRouter()
}