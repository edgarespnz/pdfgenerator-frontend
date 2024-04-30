import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/dev.environment';
import { GetPdfUrlResponse, GetResponse } from 'src/app/interfaces/generatedFiles/GetResponse';
import { GeneratePdfResponse } from 'src/app/interfaces/products/GeneratePdfResponse';



@Injectable({
  providedIn: 'root',
})

export class FilesGeneratorService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  generatePdf(
    pdfTitle: string,
    productsId: Array<number>,
    userEmail: string
  ): Observable<GeneratePdfResponse> {
    return this.http.post<GeneratePdfResponse>(this.API_URL + '/pdf/generate', {
      pdfTitle: pdfTitle,
      products_id: productsId,
      userEmail: userEmail,
    });
  }

  getPdfsByUser(id: number): Observable<GetResponse> {
    return this.http.get<GetResponse>(this.API_URL + '/pdf/user/' + id);
  }

  getPdfUrl(filename: string): Observable<GetPdfUrlResponse> {
    return this.http.get<GetPdfUrlResponse>(this.API_URL + '/pdf/open/' + filename);
  }

}
