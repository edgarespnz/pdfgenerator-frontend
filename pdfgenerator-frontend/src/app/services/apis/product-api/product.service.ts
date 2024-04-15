import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/dev.environment';
import { createProduct } from 'src/app/interfaces/products/createProduct.interface';
import { editProduct } from 'src/app/interfaces/products/editProduct.interface';
import { GetProductsResponse } from 'src/app/interfaces/products/GetProductsResponse';
import { UpdateProductResponse } from 'src/app/interfaces/products/updateProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getProducts(type?: string, published?: boolean, sortBy?: string, sortOrder?: string, page?: number, pageSize?: number): Observable<GetProductsResponse>{
    let url = `${this.API_URL}/products?`;
    if (type) {
        url += `type=${type}&`;
    }
    if (published != null) {
        url += `published=${published}&`;
    }
    if (sortBy) {
        url += `sortBy=${sortBy}&`;
    }
    if (sortOrder) {
        url += `sortOrder=${sortOrder}&`;
    }
    if (page != null) {
        url += `page=${page + 1}&`;
    }
    if (pageSize != null) {
        url += `pageSize=${pageSize}&`;
    }
    return this.http.get<GetProductsResponse>(url);
}

  getProduct(id: string){
    return this.http.get(this.API_URL + '/products/' + id);
  }

  createProduct(product: createProduct){
    return this.http.post(this.API_URL + '/products', product);
  }

  updateProduct(id: number, product: editProduct): Observable<UpdateProductResponse>{
    return this.http.put<UpdateProductResponse>(this.API_URL + '/product/' + id, product);
  }

  deleteProduct(id: string){
    return this.http.delete(this.API_URL + '/products/' + id);
  }

  //BORRAR CUANDO IMPLEMENTES UN SERVICIO DE PDF
  generatePdf(productsId: any){
    console.log(productsId);
    return this.http.post(this.API_URL + '/pdf/generate', {products_id: productsId}, {responseType: 'blob'});
  }

}
