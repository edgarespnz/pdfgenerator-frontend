import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopProductComponent } from './loop-product.component';

describe('LoopProductComponent', () => {
  let component: LoopProductComponent;
  let fixture: ComponentFixture<LoopProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoopProductComponent]
    });
    fixture = TestBed.createComponent(LoopProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
