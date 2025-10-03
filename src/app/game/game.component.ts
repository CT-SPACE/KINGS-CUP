import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
// import { CardsComponent } from './cards/cards.component';
import { Game } from './../../models/game';
// import { GameService } from './../game.service';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatFormFieldModule ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  isExpanded = false;
  showTitle = false;
  game: Game | undefined;
  currentCard: string | undefined = '';
  randomRotation = 0;
  name: string = '';


  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    setTimeout(() => {
      this.isExpanded = true;
     
    }, 200);
     setTimeout(() => this.showTitle = true, 800);
this.newGame();
  }

  newGame(){
    // const cards = this.GameService.getCards();
    this.game = new Game();
    console.log(this.game);
  }

takeCard() {
  if (this.takeCardAnimation) return; 
  if (this.game && this.game.stack.length > 0) {
    this.currentCard = this.game.stack.pop() || '';
    this.takeCardAnimation = true;
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    // Nach der Animation:
    setTimeout(() => {
      if (this.currentCard) {
        const cardToAdd = this.currentCard;
        // this.currentCard = '';
        this.takeCardAnimation = false;
        this.game?.playedCards.push(cardToAdd);
      }
    }, 500); // Zeit passend zur Animation wählen
  }
}

  cardCount = 52;
get cardArray() {
  return Array.from({ length: this.cardCount });
}

  getRandomRotation(index: number): number {
  return (index * 7) % 12 - 6;
  }
 

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      // console.log('name', result );
       if (name && name.trim() !== ''){
         this.game?.players.push(name);
       }
     
   
    });
  }
}
