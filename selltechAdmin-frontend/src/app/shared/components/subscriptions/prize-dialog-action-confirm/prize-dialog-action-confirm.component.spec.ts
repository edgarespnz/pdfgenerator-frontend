import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDialogActionConfirmComponent } from './prize-dialog-action-confirm.component';

describe('PrizeDialogActionConfirmComponent', () => {
  let component: PrizeDialogActionConfirmComponent;
  let fixture: ComponentFixture<PrizeDialogActionConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrizeDialogActionConfirmComponent]
    });
    fixture = TestBed.createComponent(PrizeDialogActionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
