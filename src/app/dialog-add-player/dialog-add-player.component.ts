import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

}
