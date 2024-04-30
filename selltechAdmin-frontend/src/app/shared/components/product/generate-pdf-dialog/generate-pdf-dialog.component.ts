import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneratePdfResponse } from 'src/app/interfaces/products/GeneratePdfResponse';
import { FilesGeneratorService } from 'src/app/services/apis/files-generator-api/files-generator.service';

interface GeneratePdfDialogData {
  productsId: Array<number>;
  userEmail: string;
}

@Component({
  selector: 'app-generate-pdf-dialog',
  templateUrl: './generate-pdf-dialog.component.html',
  styleUrls: ['./generate-pdf-dialog.component.css']
})

export class GeneratePdfDialogComponent {

  products_id: Array<number> = [];
  generatePdfFormGroup: FormGroup;
  isLoading = false;

  constructor(
    private fileGeneratorService: FilesGeneratorService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GeneratePdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GeneratePdfDialogData
  ) { 
    this.products_id = data.productsId;
    console.log(this.products_id);

    this.generatePdfFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  generatePdf() {

    const params = {
      title: this.generatePdfFormGroup.value.title,
      products_id: this.products_id,
      userEmail: this.data.userEmail
    }

    if(this.generatePdfFormGroup.valid){
      this.isLoading = true;
      this.fileGeneratorService.generatePdf(params.title, params.products_id, params.userEmail)
        .subscribe({
        next: (response: GeneratePdfResponse) => {
          this.isLoading = false;
          window.open(response.pdfUrl, '_blank');
          this.closeDialog();
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.closeDialog();
        }
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
