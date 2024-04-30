import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditProduct } from 'src/app/interfaces/products/EditProduct.interface';

import { UpdateProductResponse } from 'src/app/interfaces/products/updateProduct.interface';
import { ProductService } from 'src/app/services/apis/product-api/product.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css'],
})

export class EditProductDialogComponent {

  sku = this.data.sku;
  editProductFormGroup: FormGroup;
  isLoading = false;
  
  constructor(
    private productsService: ProductService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProduct
  ) {
    this.editProductFormGroup = new FormGroup({ //TODO: AGREGAR VALIDACIONES
      sku: new FormControl(this.data.sku),
      title: new FormControl(this.data.title),
      description: new FormControl(this.data.description),
      short_description: new FormControl(this.data.short_description),
      stock: new FormControl(this.data.stock),
      regular_price: new FormControl(this.data.regular_price),
      discounted_price: new FormControl(this.data.discounted_price),
      published: new FormControl(this.data.published),
      image_url: new FormControl(this.data.image_url),
    });
  }

  editProduct() {
    const user = localStorage.getItem('user');
    this.isLoading = true;
    if(this.data.id !== undefined && user !== null){
        this.productsService.updateProduct(
          this.data.id, 
          user, //Se utiliza para la trazabilidad, como método adicional considerar el uso de un token ya que está en el local storage
          this.editProductFormGroup.value).subscribe({
        next: (response: UpdateProductResponse) => {
          if(response.success){
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
        },
        complete: () => {
          this.closeDialog();
        }
      })
    }  
  }

  closeDialog(){
    this.dialogRef.close(true);
  }
}
