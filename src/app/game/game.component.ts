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
import { Firestore, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, collectionData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';



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
  route = inject(ActivatedRoute);
  router = inject(Router);

  get gamesCollection() {
    return collection(this.firestore, 'game');}

  constructor(public dialog: MatDialog){
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isExpanded = true;
    }, 200);
     setTimeout(() => this.showTitle = true, 800);

     const gameIdFromUrl = this.route.snapshot.paramMap.get('id');
    
    if (gameIdFromUrl) {
      // Lade bestehendes Spiel von Firestore
      this.gameId = gameIdFromUrl;
      this.loadGameFromFirestore();
    } else {
this.newGame();
    }
  }

  newGame(){
    this.game = new Game();
    this.gameId = '';
    
    // addDoc(this.gamesCollection, this.game.toJSON())
    //   .then((docRef) => {
    //     this.gameId = docRef.id;
    //     console.log('New game created with Firestore ID:', this.gameId);
    //   })
    //   .catch((error) => {
    //     console.error('Error creating game:', error);
    //   });
  }

  saveNewGameToFirestore() {
  if (this.game) {
    addDoc(this.gamesCollection, this.game.toJSON())
      .then((docRef) => {
        this.gameId = docRef.id;
       // this.router.navigate(['/game', this.gameId], { replaceUrl: true });
       window.history.replaceState(null, '', `/game/${this.gameId}`);
      })
      .catch((error) => {
        console.error('Error saving game to Firestore:', error);
      });
  }
}

loadGameFromFirestore() {
    if (this.gameId) {
      const gameDoc = doc(this.firestore, 'game', this.gameId);
      getDoc(gameDoc).then((docSnap) => {
        if (docSnap.exists()) {
          const gameData = docSnap.data();
          // Game-Objekt aus Firestore-Daten rekonstruieren
          this.game = new Game();
          this.game.players = gameData['players'] || [];
          this.game.currentPlayer = gameData['currentPlayer'] || 0;
          this.game.playedCards = gameData['playedCards'] || [];
          
          // Stack rekonstruieren (falls nötig)
          if (gameData['stack']) {
            this.game.stack = gameData['stack'];
          }
          
          console.log('Game loaded from Firestore:', this.gameId);
        } else {
          console.log('Game not found, creating new one');
          this.newGame();
        }
      }).catch((error) => {
        console.error('Error loading game:', error);
        this.newGame();
      });
    }
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

      if (this.gameId !== '') {
          this.updateGameInFirestore();
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
    autoFocus: 'dialog'
  });

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.trim() !== ''){
      this.game?.players.push(name);
      
      if (this.game && this.game.players.length >= 2) {
        if (this.gameId === '') {
          this.saveNewGameToFirestore();
        } else {
          this.updateGameInFirestore();
        }
      }
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
