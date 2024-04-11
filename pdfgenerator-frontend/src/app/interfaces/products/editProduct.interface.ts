export interface editProduct {
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
    price?: number;
    image_url?: string;
    video_url?: string;
    priority?: number;
}