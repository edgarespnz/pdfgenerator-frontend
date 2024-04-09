import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfgeneratorExportComponent } from './pdfgenerator-export.component';

describe('PdfgeneratorExportComponent', () => {
  let component: PdfgeneratorExportComponent;
  let fixture: ComponentFixture<PdfgeneratorExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfgeneratorExportComponent]
    });
    fixture = TestBed.createComponent(PdfgeneratorExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
