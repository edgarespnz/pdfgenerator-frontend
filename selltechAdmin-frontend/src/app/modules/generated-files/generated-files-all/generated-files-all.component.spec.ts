import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedFilesAllComponent } from './generated-files-all.component';

describe('GeneratedFilesAllComponent', () => {
  let component: GeneratedFilesAllComponent;
  let fixture: ComponentFixture<GeneratedFilesAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratedFilesAllComponent]
    });
    fixture = TestBed.createComponent(GeneratedFilesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
