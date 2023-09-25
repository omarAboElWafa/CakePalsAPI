import { Request, Response } from 'express';
import RatingService from './rating.service';

class RatingController {
     ratingService: RatingService;
    constructor(RatingService: RatingService) {
        this.ratingService = RatingService;
    }
    create = async (req: Request, res: Response) => {
        try {
            const rating = await this.ratingService.create(req.body);
            res.status(201).send(rating);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    get = async (req: Request, res: Response) => {
        try {
            const ratings = await this.ratingService.get();
            res.status(200).send(ratings);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const rating = await this.ratingService.getById(req.params.id);
            res.status(200).send(rating);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const rating = await this.ratingService.update(req.params.id, req.body);
            res.status(200).send(rating);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const rating = await this.ratingService.delete(req.params.id);
            res.status(200).send(rating);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } 
    
}


export default RatingController;