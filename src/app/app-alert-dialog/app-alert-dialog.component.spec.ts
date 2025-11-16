import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAlertDialogComponent } from './app-alert-dialog.component';

describe('AppAlertDialogComponent', () => {
  let component: AppAlertDialogComponent;
  let fixture: ComponentFixture<AppAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAlertDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
