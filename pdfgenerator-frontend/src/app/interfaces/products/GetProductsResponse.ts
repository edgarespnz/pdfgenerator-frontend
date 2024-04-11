import { Product } from "./product.interface";

export interface GetProductsResponse{
    success: boolean;
    total:number;
    products: Product[];
}