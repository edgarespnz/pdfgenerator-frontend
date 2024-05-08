import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDialogEditComponent } from './prize-dialog-edit.component';

describe('PrizeDialogEditComponent', () => {
  let component: PrizeDialogEditComponent;
  let fixture: ComponentFixture<PrizeDialogEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrizeDialogEditComponent]
    });
    fixture = TestBed.createComponent(PrizeDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
