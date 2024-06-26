import { Category } from "./Category.interface";

export interface Product {
    id?: number;
    type?: string;
    sku?: string;
    title?: string;
    published?: boolean;
    visibility?: string;
    short_description?: string;
    description?: string;
    existence?: boolean;
    stock?: number;
    weight?: number;
    long?: number;
    width?: number;
    height?: number;
    allow_reviews?: boolean;
    discounted_price?: number;
    regular_price?: number;
    image_url?: string;
    video_url?: string;
    priority?: number;
    categoryId?: number;
    brandId?: number;
    lastEditedBy? : string;
    Category: Category;
}