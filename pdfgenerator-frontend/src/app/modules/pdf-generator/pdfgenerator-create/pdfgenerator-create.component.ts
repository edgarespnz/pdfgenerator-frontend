import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetProductsResponse } from 'src/app/interfaces/products/GetProductsResponse';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/apis/product-api/product.service';

@Component({
  selector: 'app-pdfgenerator-create',
  templateUrl: './pdfgenerator-create.component.html',
  styleUrls: ['./pdfgenerator-create.component.css'],
})
export class PdfgeneratorCreateComponent {
  displayedColumns: string[] = [
    'select',
    'sku',
    'title',
    'stock',
    'price',
    'discounted_price',
  ];

  dataSource = new MatTableDataSource<Product>([]);
  selection = new SelectionModel<Product>(true, []);

  //TODO: MODIFICAR NOMBRE
  isLoading = false;

  constructor(
    private productService: ProductService
  ) {
    this.fetchProducts();
  }

  toggleAllRows() {
    if(this.isAllSelected()){
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Product): string {
    if(!row || row.sku ===undefined){
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sku + 1}`
  }


  fetchProducts(){
    const queryParams = {
      type: 'simple',
      published: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: undefined,
      pageSize: 100
    }
    this.productService.getProducts(
      queryParams.type,
      queryParams.published,
      queryParams.sortBy,
      queryParams.sortOrder,
      queryParams.page,
      queryParams.pageSize
    ).subscribe({
      next: (response: GetProductsResponse) => {
        this.dataSource.data = response.products;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  generatePdf(){
    this.isLoading = true;
    const products_id_list = this.selection.selected.map(product => product.id);
    console.log(products_id_list);
    this.productService.generatePdf(products_id_list).subscribe({
      next: (response:any) => {
        const file = new Blob([response], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL,'_blank');
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      }
    })
  }
}
