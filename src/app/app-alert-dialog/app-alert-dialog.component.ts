import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './app-alert-dialog.component.html',
  styleUrl: './app-alert-dialog.component.scss'
})
export class AlertDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div mat-dialog-content>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">Abbrechen</button>
      <button mat-button color="warn" (click)="close(true)">{{ data.confirmText || 'Bestätigen' }}</button>
    </div>
  `
})

export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string; 
      message: string; 
      confirmText?: string; 
    }
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}