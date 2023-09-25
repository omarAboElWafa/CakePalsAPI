import { IRating, RatingInput } from "@/contracts/rating";
import Rating from "./rating.entities";

class RatingService {
    create = async (rating: RatingInput<IRating>) => {
        try{
            const newRating = new Rating(rating);
            return await newRating.save();
        } catch(error){
            throw error;
        }
    }

    get = async () => {
        try{
            return await Rating.find().lean();
        } catch(error){
            throw error;
        }
    }

    getById = async (id: string) => {
        try {
            return await Rating.findById(id).lean();
        } catch (error) {
            throw error;
        }
    }

    update = async (id: string, toBeUpdated: Object) => {
        try {
            const updated = await Rating.findByIdAndUpdate(id, {$set: toBeUpdated}, {new: true});
            const updatedRating = new Rating(updated);
            return await updatedRating.save();
        } catch (error) {
            throw error;
        }
    }

    delete = async (id: string) => {
        try {
            return await Rating.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}
export default RatingService;