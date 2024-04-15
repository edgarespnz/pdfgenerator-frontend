import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { editProduct } from 'src/app/interfaces/products/editProduct.interface';
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
    @Inject(MAT_DIALOG_DATA) public data: editProduct
  ) {
    this.editProductFormGroup = new FormGroup({
      sku: new FormControl(this.data.sku),
      title: new FormControl(this.data.title),
      description: new FormControl(this.data.description),
      short_description: new FormControl(this.data.short_description),
      stock: new FormControl(this.data.stock),
      price: new FormControl(this.data.price),
      discounted_price: new FormControl(this.data.discounted_price),
      published: new FormControl(this.data.published),
      image_url: new FormControl(this.data.image_url),
    });
  }

  editProduct() {
    this.isLoading = true;
    if(this.data.id !== undefined){
      console.log("datos para mandar", this.editProductFormGroup.value); //BORRAR
        this.productsService.updateProduct(this.data.id, this.editProductFormGroup.value).subscribe({
        next: (response: UpdateProductResponse) => {
          if(response.success){
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log("SE MUESTRA UN MAT ERROR CON EL ERROR CORRESPONDIENTE", error);
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
