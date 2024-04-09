import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfgeneratorCreateComponent } from './pdfgenerator-create.component';

describe('PdfgeneratorCreateComponent', () => {
  let component: PdfgeneratorCreateComponent;
  let fixture: ComponentFixture<PdfgeneratorCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfgeneratorCreateComponent]
    });
    fixture = TestBed.createComponent(PdfgeneratorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
