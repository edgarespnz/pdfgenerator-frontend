import { Pdf } from "./pdf.interface";

export interface GetResponse {
    ok: boolean;
    pdfs: Array<Pdf>;
}

export interface GetPdfUrlResponse {
    ok: boolean;
    pdfUrl: string;
}