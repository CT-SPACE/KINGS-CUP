import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { Game } from './../../models/game';
// import { GameService } from './../game.service';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,CardsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  takeCardAnimation = false;
  isExpanded = false;
  showTitle = false;
  game: Game | undefined;

  ngOnInit() {
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
  takeCard(){
    this.takeCardAnimation = true;
    setTimeout(() => {
  this.takeCardAnimation = false;
}, 500)
    
  }

  getRandomRotation(): string {
  const deg = (Math.random() * 6) - 3; // -3 bis +3
  return `rotate(${deg}deg)`;
}
  
 }
