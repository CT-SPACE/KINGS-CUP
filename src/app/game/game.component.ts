import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
// import { CardsComponent } from './cards/cards.component';
import { Game } from './../../models/game';

// import { GameService } from './../game.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameRuleComponent } from '../game-rule/game-rule.component';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent, ConfirmDialogComponent } from '../app-alert-dialog/app-alert-dialog.component';
import { EditPlayerComponent, PlayerDialogData } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    GameRuleComponent,
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule
  
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  isExpanded = false;
  showTitle = false;
  game: Game | undefined;
  currentCard: string = '';
  randomRotation = 0;
  name: string = '';
  firestore: Firestore = inject(Firestore);
  gameId: string = '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  private editPlayerComponentRef = EditPlayerComponent;


  get gamesCollection() {
    return collection(this.firestore, 'game');
  }

  get stackCount(): number[] {
    if (!this.game) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Initial 10 Karten
    }

    const playedCardsCount = this.game.playedCards.length;
    const remainingCardsToShow = Math.max(
      0,
      10 - Math.max(0, playedCardsCount - 41)
    );

    return Array.from({ length: remainingCardsToShow }, (_, i) => i + 1);
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  

    setTimeout(() => {
      this.isExpanded = true;
    }, 200);
    setTimeout(() => (this.showTitle = true), 800);

    const gameIdFromUrl = this.route.snapshot.paramMap.get('id');

    if (gameIdFromUrl) {
      // Lade bestehendes Spiel von Firestore
      this.gameId = gameIdFromUrl;
      this.loadGameFromFirestore();
    } else {
      this.newGame();
    }
  }

  newGame() {
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
      getDoc(gameDoc)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const gameData = docSnap.data();
            // Game-Objekt aus Firestore-Daten rekonstruieren
            this.game = new Game();
            this.game.players = gameData['players'] || [];
            this.game.playerImages = gameData['playerImages'] || [];
            this.game.currentPlayer = gameData['currentPlayer'] || 0;
            this.game.playedCards = gameData['playedCards'] || [];

            if (gameData['stack']) {
              this.game.stack = gameData['stack'];
            }
            if (this.game.playedCards && this.game.playedCards.length > 0) {
              this.currentCard =
                this.game.playedCards[this.game.playedCards.length - 1];
            }

            console.log('Game loaded from Firestore:', this.gameId);
          } else {
            this.currentCard = '';
            console.log('Game not found, creating new one');
            this.newGame();
          }
        })
        .catch((error) => {
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
          this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: {
        title: 'Zu wenige Spieler',
        message: 'Bitte füge mindestens zwei Spieler hinzu, um das Spiel zu starten.'
      }
    });
      return;
    }

    if (this.game && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop() || '';
      this.takeCardAnimation = true;
      this.game.currentPlayer =
        (this.game.currentPlayer + 1) % this.game.players.length;

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
    return ((index * 7) % 12) - 6;
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
  //     autoFocus: 'dialog',
  //   });

  //   dialogRef.afterClosed().subscribe((name: string) => {
  //     if (name && name.trim() !== '') { 
  //       this.game?.players.push(name);
  //       this.game?.playerImages.push('beer.svg'); 

  //       if (this.game && this.game.players.length >= 2) {
  //         if (this.gameId === '') {
  //           this.saveNewGameToFirestore();
  //         } else {
  //           this.updateGameInFirestore();
  //         }
  //       }
  //     }
  //   });
  // }
  /**
   * Mischt alle gespielten Karten neu und fügt sie dem Stapel hinzu
   */
  reshuffleCards() {
    if (!this.game) return;

    // Alle gespielten Karten zurück in den Stack
    const allCards = [...this.game.playedCards];

    // Karten mischen (Fisher-Yates Algorithmus)
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    // Stack und PlayedCards zurücksetzen
    this.game.stack = allCards;
    this.game.playedCards = [];
    this.currentCard = '';

    // Firebase aktualisieren
    if (this.gameId) {
      this.updateGameInFirestore();
    }
  }

  /**
   * Startet ein komplett neues Spiel
   */
  startNewGame() {
     const confirmed = confirm(

      
  );


    if (confirmed)  {
      // Spieler behalten, aber neues Spiel
      const currentPlayers = this.game?.players || [];

      this.newGame();

      // Spieler wieder hinzufügen
      if (currentPlayers.length > 0) {
        this.game!.players = [...currentPlayers];
      }

      if (currentPlayers.length >= 2) {
        this.saveNewGameToFirestore(); // ✅ Erstellt neue Firestore-Dokument
      }
   }
  }
  
  // editPlayer(playerId: number){
  //   console.log('Edit player', playerId);
  //   const dialogRef = this.dialog.open(this.editPlayerComponentRef);
  //   dialogRef.afterClosed().subscribe((change: string) => {
  //     console.log("received change:", change);
  //   })
  // }


  // ✅ ERSETZT: Alte openDialog() durch neue Implementierung
  openDialog(): void {
    const dialogRef = this.dialog.open(this.editPlayerComponentRef, {
      width: '500px',
      data: { 
        mode: 'add' as const
      } as PlayerDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        // Spieler hinzufügen mit Bild
        this.game?.players.push(result.name);
        
        // // ✅ NEU: Player Images Array erweitern
        // if (!this.game) {
        //   this.game.playerImages = [];
        // }


        if (!this.game?.playerImages) {
        this.game!.playerImages = [];
      }
      this.game!.playerImages.push(result.image);

        // Firebase Update
        if (this.game?.players.length === 2) {
          this.saveNewGameToFirestore();
        } else if (this.gameId) {
          this.updateGameInFirestore();
        }

        console.log('Player added:', result.name, 'with image:', result.image);
      }
    });
  }

  // ✅ NEU: Edit Player Methode
  editPlayer(playerIndex: number): void {
    if (!this.game?.players[playerIndex]) return;

    const dialogRef = this.dialog.open(this.editPlayerComponentRef, {
      width: '500px',
      data: { 
        mode: 'edit' as const,
        playerName: this.game.players[playerIndex],
        playerImage: this.game.playerImages?.[playerIndex] || 'beer.svg',
        playerIndex: playerIndex
      } as PlayerDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.name || !this.game) {
        return;
      }
        // Spieler bearbeiten
        this.game.players[playerIndex] = result.name;
        
        // Player Image aktualisieren
        if (!this.game.playerImages) {
          this.game.playerImages = [];
        }
        this.game.playerImages[playerIndex] = result.image;

        // Firebase Update
        if (this.gameId) {
          this.updateGameInFirestore();
        }

        console.log('Player updated:', result.name, 'with image:', result.image);
      });
    }
  }

