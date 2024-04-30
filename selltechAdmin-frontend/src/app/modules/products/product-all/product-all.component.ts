import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort , Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Blob } from 'buffer';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GeneratePdfResponse } from 'src/app/interfaces/products/GeneratePdfResponse';
import { Product } from 'src/app/interfaces/products/Product.interface';
import { ProductsQueryParams } from 'src/app/interfaces/products/productsQueryParams.interface';
import { CategoryService } from 'src/app/services/apis/category-api/category.service';
import { ProductService } from 'src/app/services/apis/product-api/product.service';
import { EditProductDialogComponent } from 'src/app/shared/components/product/edit-product-dialog/edit-product-dialog.component';
import { GeneratePdfDialogComponent } from 'src/app/shared/components/product/generate-pdf-dialog/generate-pdf-dialog.component';
import { removeAccents } from 'src/app/utils/regex.utils';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css'],
})
export class ProductAllComponent implements AfterViewInit {

  dataSource: MatTableDataSource<Product> = new MatTableDataSource(); //data source for the products table
  dataCopy: Product[] = []; //copy of the data source for actions like edit , delete and update
  selection = new SelectionModel<Product>(true, []); //selection model for the products table
  categories: any[] = []; //TODO: tipar la respuesta con una interfaz
  selectedCategories = new FormControl([]); 
  displayedColumns: string[] = [
    'select',
    'sku',
    'title',
    'category',
    'stock',
    'price',
    'discounted_price',
    'published',
    'actions',
    'lastEdit'
  ];

  isHeaderSticky = true; 
  isHeaderCheckboxChecked = false; //defines the checkbox status in the header of the products table

  //loadings
  isLoadingResults = true; //defines spinner loading for the products table
  resultsLength = 0;
  isAnyRowSelected = true; //defines if any row is selected in the products table

  productsQueryParams: ProductsQueryParams = {
    type: '',
    published: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    page: undefined,
    pageSize: 100,
    categories: [],
  };

 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private productsService: ProductService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private categoryService: CategoryService,
  ) {}

  ngAfterViewInit() {
    this.getQueryProducts();
    this.fetchCategories();
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
          this.productsQueryParams.page = this.paginator.pageIndex + 1;
          this.productsQueryParams.pageSize = this.paginator.pageSize;
          return this.productsService
            .getProducts(this.productsQueryParams)
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
    const filterValue = removeAccents((event.target as HTMLInputElement).value);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Función personalizada para filtrar los datos
  customFilterPredicate(data: Product, filter: string): boolean {
    const filterWithoutAccents = removeAccents(filter).toLowerCase();
    const sku = removeAccents(data.sku ?? '').toLowerCase();
    const title = removeAccents(data.title ?? '').toLowerCase();
    const category = removeAccents(data.Category.name ?? '').toLowerCase();

    return (
      title.includes(filterWithoutAccents) || 
      sku.includes(filterWithoutAccents) ||
      category.includes(filterWithoutAccents)
    );
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

  toggleAllRows(){
    if(this.isAllSelected()){
      this.isAnyRowSelected = true;
      this.selection.clear();
      return;
    }
    this.isAnyRowSelected = false;
    this.selection.select(...this.dataSource.data);
    this.isHeaderCheckboxChecked = this.isAllSelected();
  }

  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isCheckBoxSelected(event: Event){
    event.stopPropagation()
    if(this.selection.selected.length > 0){
      this.isAnyRowSelected = false;
      return;
    }
    this.isAnyRowSelected = true;
  }

  checkboxLabel(row?: Product): string {
    if (!row || row?.sku === undefined) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}  row${
      row.sku + 1
    }`;
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {  //TODO: TIPAR LA RESPUESTA CON UNA INTERFAZ
       this.selection.clear();
       this.isHeaderCheckboxChecked = false;
        this.categories = response.categories;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  addCategoryToSelection() {
    const selectedCategories = this.selectedCategories.value;
    this.productsQueryParams.categories = selectedCategories;
    this.getQueryProducts();
  }

  openGeneratePdfDialog() {
    
    this.dialog.open(GeneratePdfDialogComponent, {
      data: {
        productsId: this.selection.selected.map((product) => product.id),
        userEmail: localStorage.getItem('email') ?? '',
      },
      width: '500px',
    })
  }


}
