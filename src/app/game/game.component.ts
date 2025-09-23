import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';


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

  ngOnInit() {
    setTimeout(() => {
      this.isExpanded = true;
    }, 200);
  }
  takeCard(){
    this.takeCardAnimation = true;
  }
  
 }
