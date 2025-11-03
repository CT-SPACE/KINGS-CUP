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
import { GameRuleComponent } from '../game-rule/game-rule.component';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameRuleComponent, CommonModule, PlayerComponent, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatFormFieldModule ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  isExpanded = false;
  showTitle = false;
  game: Game | undefined;
  currentCard: string = '';
  randomRotation = 0;
  name: string = '';
  stackCount = [1,2,3,4,5,6,7,8,9,10];
  firestore: Firestore = inject(Firestore);
  gameId: string = '';

  get gamesCollection() {
    return collection(this.firestore, 'game');}

  constructor(public dialog: MatDialog){
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isExpanded = true;
    }, 200);
     setTimeout(() => this.showTitle = true, 800);
this.newGame();
  }

  newGame(){
    this.game = new Game();
    
    addDoc(this.gamesCollection, this.game.toJSON())
      .then((docRef) => {
        this.gameId = docRef.id;
        console.log('New game created with Firestore ID:', this.gameId);
      })
      .catch((error) => {
        console.error('Error creating game:', error);
      });
  }

  updateGameInFirestore() {
    if (this.game && this.gameId) {
      const gameDoc = doc(this.firestore, 'game', this.gameId);
      updateDoc(gameDoc, this.game.toJSON())
        .then(() => {
          console.log('Game updated in Firestore with ID:', this.gameId);
        })
        .catch((error) => {
          console.error('Error updating game:', error);
        });
    }
  }

takeCard() {
  if (this.takeCardAnimation) return; 
  if (this.game?.players.length! < 2) {
    alert('Please add at least two players to start the game.');
    return;
  }
  if (this.game && this.game.stack.length > 0) {
    this.currentCard = this.game.stack.pop() || '';
    this.takeCardAnimation = true;
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    
    setTimeout(() => {
      if (this.currentCard) {
        const cardToAdd = this.currentCard;
        this.takeCardAnimation = false;
        this.game?.playedCards.push(cardToAdd);
      }
    }, 500); 
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
  const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    autoFocus: false, // Deaktiviert automatischen Focus
    restoreFocus: false // Verhindert Focus-Wiederherstellung
  });

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.trim() !== ''){
      this.game?.players.push(name);
      this.updateGameInFirestore();
    }
  });
}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  //   dialogRef.afterClosed().subscribe((name: string) => {
  //     // console.log('name', result );
  //      if (name && name.trim() !== ''){
  //        this.game?.players.push(name);
  //         this.updateGameInFirestore();
  //      }
     
   
  //   });
  // }
}
