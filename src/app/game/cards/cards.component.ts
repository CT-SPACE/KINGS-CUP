import { Component, inject } from '@angular/core';
import { GameService } from './../../game.service';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

cards: any[] = [];
  currentCardIndex = 0;
// allCards = inject(GameService);

  constructor(private gameService: GameService) {}


  ngOnInit() {
   this.cards = this.gameService.getCards();
   
  }

  

  showNextCard() {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
    }


  }
  getCardStyle() {
  const color = this.cards[this.currentCardIndex]?.color || '#000';
  
  return {
  color: color,
  outlineColor: color,
  outlineStyle: 'solid',
  outlineWidth: '2px',
  outlineOffset: '-30px'
  };
}

}
