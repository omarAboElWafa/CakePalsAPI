import { IProduct, ProductInput } from "@/contracts/product";
import Product from "./product.entities";
import UserService from "../user/user.service";
import { Position } from "@/contracts/position";

class ProductService {
    // initialize the service
    userService :UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    create = async (product: ProductInput<IProduct>) => {
        try{
            const newProduct = new Product(product);
            return await newProduct.save();
        } catch(error){
            throw error;
        }
    }

    get = async (page: number, limit: number) => {
        try{
            const products = await Product.find().skip((page - 1) * limit).limit(limit).lean();
            const productsCount = await Product.find().countDocuments();
            const totalPages = Math.ceil(productsCount / limit);
            const hasNextPage = page < totalPages;
            const hasPreviousPage = page > 1;
            const pagination = {
                hasNextPage,
                hasPreviousPage,
                totalPages,
                currentPage: page
            };
            return {products, pagination};
        } catch(error){
            throw error;
        }
    }

    getById = async (id: string) => {
        try {
            return await Product.findById(id).lean();
        } catch (error) {
            throw error;
        }
    }

    update = async (id: string, toBeUpdated: Object) => {
        try {
            const updated = await Product.findByIdAndUpdate(id, {$set: toBeUpdated}, {new: true});
            const updatedProduct = new Product(updated);
            return await updatedProduct.save();
        } catch (error) {
            throw error;
        }
    }

    delete = async (id: string) => {
        try {
            return await Product.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    search = async (query: any, location: Position) => {
        const {lat, lang} = location;
        try{
            const page = parseInt(query.page, 10) || 1;
            const limit = parseInt(query.limit, 10) || 10;
            const nearByBakers = await this.userService.getNearByBakers(lat, lang);
            const bakerIds = nearByBakers.map(baker => baker._id);
            const products = await Product.find({baker: {$in: bakerIds}}).skip((page - 1) * limit).limit(limit).lean();
            const productsCount = await Product.find({baker: {$in: bakerIds}}).countDocuments();
            const totalPages = Math.ceil(productsCount / limit);
            const hasNextPage = page < totalPages;
            const hasPreviousPage = page > 1;
            const pagination = {
                hasNextPage,
                hasPreviousPage,
                totalPages,
                currentPage: page                
            }
            return {products, pagination};
        }
        catch(error){
            throw error;
        }
    }

}
export default ProductService;