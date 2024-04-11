import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/apis/product-api/product.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css'],
})
export class ProductAllComponent implements AfterViewInit {
  productsList: Product[] = [];
  displayedColumns: string[] = [
    'sku',
    'title',
    'stock',
    'price',
    'discounted_price',
    'published',
    'actions',
  ];

  isLoadingResults = true;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductService) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productsService
            .getProducts(
              'simple',
              true,
              undefined,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          console.log(data);
          if (data === null) {
            return [];
          }
          this.resultsLength = data.total;
          return data.products;
        })
      )
      .subscribe((data) => (this.productsList = data));
  }

  editProduct(id: number) {
    console.log('edit Product');
  }

  deleteProduct(id: number) {
    console.log('delete product');
  }
}
