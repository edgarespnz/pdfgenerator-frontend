import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfgeneratorEditComponent } from './pdfgenerator-edit.component';

describe('PdfgeneratorEditComponent', () => {
  let component: PdfgeneratorEditComponent;
  let fixture: ComponentFixture<PdfgeneratorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfgeneratorEditComponent]
    });
    fixture = TestBed.createComponent(PdfgeneratorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
