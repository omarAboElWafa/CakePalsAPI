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

    get = async (userID : string) => {
        try{
            return await Rating.find({ 
                $or: [{ baker: userID }, { user: userID}]
            }).lean();

        } catch(error){
            throw error;
        }
    }

    getById = async (id: string, userID :string) => {
        try {
            const rating = await Rating.findOne({ _id: id, $or: [{ baker: userID }, { user: userID}] }).lean();
            return rating;
        } catch (error) {
            throw error;
        }
    }

    update = async (id: string, userID: string ,toBeUpdated: Object) => {
        try {
            // check that the rating belongs to the user (client only)
            const rating = await Rating.findOne({ _id: id, user: userID });
            if (!rating) {
                return null;
            }
            // update the rating
            const updated = await Rating.findByIdAndUpdate(id, {$set: toBeUpdated}, {new: true});
            const updatedRating = new Rating(updated);
            return await updatedRating.save();

        } catch (error) {
            throw error;
        }
    }

    delete = async (id: string, userID: string) => {
        try {
            // check that the rating belongs to the user (client only)
            const rating = await Rating.findOne({ _id: id, user: userID });
            if (!rating) {
                return null;
            }
            return await Rating.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    getAverageRating = async (id: string) => {
        try {
            const ratings = await Rating.find({ baker: id }).lean();
            const totalRatings = ratings.length;
            let totalRating = 0;
            ratings.forEach((rating: any) => {
                totalRating += rating.rating;
            });
            const averageRating = totalRating / totalRatings;
            return averageRating;
        } catch (error) {
            throw error;
        }
    }

}
export default RatingService;