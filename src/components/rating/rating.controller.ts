import { Request, Response } from 'express';
import RatingService from './rating.service';
import * as cache from '@/utils/cache';

class RatingController {
     ratingService: RatingService;
    constructor(RatingService: RatingService) {
        this.ratingService = RatingService;
    }
    create = async (req: Request, res: Response) => {
        try {
            const rating = await this.ratingService.create(req.body);
            if (!rating) {
                return res.status(400).send({ message: 'Rating was not created' });
            }
            return res.status(201).send(rating);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
    get = async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const ratings = await this.ratingService.get(userID);
            return res.status(200).send(ratings);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const rating = await this.ratingService.getById(req.params.id, userID);
            if (!rating) {
                return res.status(404).send({ message: 'Rating not found.' });
            }
            return res.status(200).send(rating);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { userID, ratingValue, comment} = req.body;
            const rating = await this.ratingService.update(req.params.id, userID , { rating: ratingValue, comment});
            if (!rating) {
                return res.status(404).send({ message: 'Rating not found.' });
            }
            return res.status(200).send(rating);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const rating = await this.ratingService.delete(req.params.id, userID);
            if (!rating) {
                return res.status(404).send({ message: 'Rating not found.' });
            }
            return res.status(200).send(rating);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    } 

    // get average rating for a baker
    getAverageRating = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const averageRating = await this.ratingService.getAverageRating(id);
            return res.status(200).send({ averageRating });
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
    
}


export default RatingController;