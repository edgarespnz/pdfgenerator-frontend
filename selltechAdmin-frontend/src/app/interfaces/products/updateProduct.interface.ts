import { Product } from "./Product.interface";

export interface UpdateProductResponse{
    success: boolean;
    message: StringConstructor;
    products: Product[];
}