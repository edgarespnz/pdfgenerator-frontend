import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/dev.environment';
import { createProduct } from 'src/app/interfaces/products/createProduct.interface';
import { editProduct } from 'src/app/interfaces/products/editProduct.interface';
import { GetProductsResponse } from 'src/app/interfaces/products/GetProductsResponse';
import { ProductsQueryParams } from 'src/app/interfaces/products/productsQueryParams.interface';
import { UpdateProductResponse } from 'src/app/interfaces/products/updateProduct.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getProducts(
    ProductQueryParams: ProductsQueryParams
  ): Observable<GetProductsResponse> {
    let url = `${this.API_URL}/products?`;
    if (ProductQueryParams.type) {
      url += `type=${ProductQueryParams.type}&`;
    }
    if (ProductQueryParams.published != null) {
      url += `published=${ProductQueryParams.published}&`;
    }
    if (ProductQueryParams.sortBy) {
      url += `sortBy=${ProductQueryParams.sortBy}&`;
    }
    if (ProductQueryParams.sortOrder) {
      url += `sortOrder=${ProductQueryParams.sortOrder}&`;
    }
    if (ProductQueryParams.page != null) {
      url += `page=${ProductQueryParams.page }&`;
    }
    if (ProductQueryParams.pageSize != null) {
      url += `pageSize=${ProductQueryParams.pageSize}&`;
    }
    if (ProductQueryParams.categories) {
      url += `categories=${ProductQueryParams.categories.join(',')}&`;
    }
    console.log(url)
    return this.http.get<GetProductsResponse>(url);
  }

  getProduct(id: string) {
    return this.http.get(this.API_URL + '/products/' + id);
  }

  createProduct(product: createProduct) {
    return this.http.post(this.API_URL + '/products', product);
  }

  updateProduct(
    id: number,
    product: editProduct
  ): Observable<UpdateProductResponse> {
    return this.http.put<UpdateProductResponse>(
      this.API_URL + '/product/' + id,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(this.API_URL + '/products/' + id);
  }

  //BORRAR CUANDO IMPLEMENTES UN SERVICIO DE PDF
  generatePdf(productsId: any) {
    console.log(productsId);
    return this.http.post(
      this.API_URL + '/pdf/generate',
      { products_id: productsId },
      { responseType: 'blob' }
    );
  }
}
