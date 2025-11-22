import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface PlayerDialogData {
  mode: 'add' | 'edit';
  playerName?: string;
  playerImage?: string;
  playerIndex?: number;
}

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
        CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

allProfilePictures: string[] = ['beer.svg','can.svg','champagner.svg', 'cocktail.svg', 'coffee.svg', 'coffee-mug.svg', 'hot-drink.svg','lemonade-soda.svg','longdrink.svg','martini.svg','red-wine-glass.svg','white-wine-glass.svg'];
selectedPicture = this.allProfilePictures[0];

playerName: string = '';
  selectedImage: string = 'profile-1.png';
  
  // UI properties
  isEditMode: boolean = false;
  dialogTitle: string = 'Spieler hinzufügen';

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerDialogData
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';
    this.dialogTitle = this.isEditMode ? 'Spieler bearbeiten' : 'Spieler hinzufügen';
    
    if (this.isEditMode && this.data.playerName) {
      this.playerName = this.data.playerName;
      this.selectedImage = this.data.playerImage || 'profile-1.png';
    }
  }

  selectImage(imageName: string): void {
    this.selectedImage = imageName;
  }

  onSave(): void {
    if (this.playerName.trim()) {
      this.dialogRef.close({
        name: this.playerName.trim(),
        image: this.selectedImage,
        mode: this.data.mode
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}



