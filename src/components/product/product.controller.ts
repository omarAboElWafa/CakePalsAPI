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
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    get = async (req: Request, res: Response) => {
        try {
            const products = await this.productService.get();
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.getById(req.params.id);
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.update(req.params.id, req.body);
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.delete(req.params.id);
            res.status(200).send(product);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    search = async (req: Request, res: Response) => {
        try {
            const { location } = req.body;
            const products = await this.productService.search(req.query, location);
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}


export default ProductController;