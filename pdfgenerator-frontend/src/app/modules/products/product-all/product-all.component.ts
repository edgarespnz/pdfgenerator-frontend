import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort , Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/apis/product-api/product.service';
import { EditProductDialogComponent } from 'src/app/shared/components/product/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css'],
})
export class ProductAllComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  dataCopy: Product[] = [];
  displayedColumns: string[] = [
    'sku',
    'title',
    'stock',
    'price',
    'discounted_price',
    'published',
    'actions',
  ];

  isHeaderSticky = false;
  regExpr: any; // Expresión regular para filtros
  isLoadingResults = true;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formControl = new FormControl('');
  skuInputOptions: [] = [];

  constructor(
    private productsService: ProductService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit() {
    this.getQueryProducts();
  }

  getQueryProducts(){
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.paginator._intl.itemsPerPageLabel = 'Productos por página';

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.productsService
            .getProducts(
              'simple',
              undefined,
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
          if (data === null) {
            return [];
          }
          this.resultsLength = data.total;
          return data.products;
        })
      )
      .subscribe((data) => {
        this.dataCopy = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        console.log('data', this.sort);
      });
      
  }

  editProduct(id: number) {
    const productToEdit = this.dataCopy.find((product) => product.id === id);
     this.dialog.open(EditProductDialogComponent, {
      data:  productToEdit,
      width: '900px',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getQueryProducts();
    });
    
  }

  deleteProduct(id: number) {
    console.log('delete product');
  }

  addProduct(){
    console.log('add product');
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  importProducts(){
    console.log('import products');
  }

  exportProducts(){
    console.log('export products');
  }

  copyToClipboard(id: number){
    console.log('copy to clipboard');
  }

  isSticky(){
    this.isHeaderSticky = !this.isHeaderSticky;
  }

}
