import {Request, Response} from 'express';
import ProductService from './product.service';

class ProductController {
    productService: ProductService;
    constructor(ProductService: ProductService) {
        this.productService = ProductService;
    }

    create = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.create(req.body);
            if (!product) {
                return res.status(400).send({ message: 'Product was not created' });
            }
            return res.status(201).send(product);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const { page, limit } = req.query;
            page && limit ? null : res.status(400).send({ message: 'page and limit query parameters are required' });
            const pageInt = parseInt(page as string);
            const limitInt = parseInt(limit as string);
            const products = await this.productService.get(pageInt, limitInt);
            if (!products) {
                return res.status(404).send({ message: 'No products found' });
            }
            return res.status(200).send(products);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.getById(req.params.id);
            return res.status(200).send(product);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.update(req.params.id, req.body);
            return res.status(200).send(product);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.delete(req.params.id);
            return res.status(200).send(product);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    search = async (req: Request, res: Response) => {
        try {
            const { location } = req.body;
            const products = await this.productService.search(req.query, location);
            return res.status(200).send(products);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}


export default ProductController;