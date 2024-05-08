import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrizeService } from 'src/app/services/apis/prize-api/prize.service';
import { CreateProductDialogComponent } from '../../product/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-prize-dialog-create',
  templateUrl: './prize-dialog-create.component.html',
  styleUrls: ['./prize-dialog-create.component.css']
})
export class PrizeDialogCreateComponent {

  
  createPrizeFormGroup: FormGroup;
  isLoading = false;


  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private prizeService: PrizeService
  ) {
    this.createPrizeFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image_url: new FormControl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdglFIu0FoHPkEWMeZEVoYq1L44mazcmDr2B5P4ej7WQ&s'), //TODO: Agregar validación de archivo
      quantity: new FormControl('', [Validators.required]),
      active: new FormControl(true, [Validators.required]),
    });
  }

  agregarProducto(){
    console.log('Agregando producto');
  }

  onSubmit(){
    if(this.createPrizeFormGroup.invalid){
      this.createPrizeFormGroup.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const newPrizeData = this.createPrizeFormGroup.value;
    this.prizeService.createPrize(newPrizeData).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.dialogRef.close();
        
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  onClose(){
    this.dialogRef.close();
  }
}
