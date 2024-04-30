import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GetPdfUrlResponse, GetResponse } from 'src/app/interfaces/generatedFiles/GetResponse';
import { Pdf } from 'src/app/interfaces/generatedFiles/pdf.interface';
import { FilesGeneratorService } from 'src/app/services/apis/files-generator-api/files-generator.service';

@Component({
  selector: 'app-generated-files-all',
  templateUrl: './generated-files-all.component.html',
  styleUrls: ['./generated-files-all.component.css'],
})
export class GeneratedFilesAllComponent implements AfterViewInit {

  isLoading = true;
  tableData: MatTableDataSource<Pdf> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'title',
    'identifier',
    'created_at',
    'actions'
  ];

  constructor(
    private filesGeneratorService: FilesGeneratorService,
    private router: Router
  ) { }

  ngAfterViewInit() {
      this.fetchPdfs();
  }

  fetchPdfs() {

    this.isLoading = true;
    const userId = localStorage.getItem('userId');

    if (!userId || userId === '') {
      this.isLoading = false;
      return;
    }
    
    this.filesGeneratorService.getPdfsByUser(parseInt(userId)).subscribe({
      next: (response: GetResponse) => {
        this.isLoading = false;
        if (response.ok) {
          this.tableData = new MatTableDataSource(response.pdfs);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onDelete(id: number){
    console.log(id);
  }

  openPdf(filename:string){
    this.filesGeneratorService.getPdfUrl(filename).subscribe({
      next: (response: GetPdfUrlResponse) => {
        window.open(response.pdfUrl, '_blank');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  goToProducts(){
    this.router.navigate(['/admin/dashboard/products/all']);
  }

}
