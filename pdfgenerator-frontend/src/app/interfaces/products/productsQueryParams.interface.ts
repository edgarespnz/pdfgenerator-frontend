export interface ProductsQueryParams {
    type: string | null | undefined;
    published: boolean | null | undefined;
    sortBy: string | null | undefined;
    sortOrder: string | null | undefined;
    page: number | null | undefined;
    pageSize: number | null | undefined;
    categories: string[] |number[] | null | undefined;
}