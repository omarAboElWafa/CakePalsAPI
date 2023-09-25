import { IProduct, ProductInput } from "@/contracts/product";
import Product from "./product.entities";

class ProductService {
    create = async (product: ProductInput<IProduct>) => {
        try{
            const newProduct = new Product(product);
        } catch(error){
            throw error;
        }
    }

    get = async () => {
        try{
            return await Product.find().lean();
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

}
export default ProductService;