import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDialogCreateComponent } from './prize-dialog-create.component';

describe('PrizeDialogCreateComponent', () => {
  let component: PrizeDialogCreateComponent;
  let fixture: ComponentFixture<PrizeDialogCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrizeDialogCreateComponent]
    });
    fixture = TestBed.createComponent(PrizeDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
