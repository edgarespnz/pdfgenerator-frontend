import { Product } from "./Product.interface";

export interface GetProductsResponse{
    success: boolean;
    total:number;
    products: Product[];
}