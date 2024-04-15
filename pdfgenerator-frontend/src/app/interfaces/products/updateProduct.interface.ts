import { Product } from "./product.interface";

export interface UpdateProductResponse{
    success: boolean;
    message: StringConstructor;
    products: Product[];
}