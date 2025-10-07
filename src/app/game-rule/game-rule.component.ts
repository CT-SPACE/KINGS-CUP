import { Component, Input, OnChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-game-rule',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-rule.component.html',
  styleUrl: './game-rule.component.scss'
})
export class GameRuleComponent implements OnChanges {

cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'When the Thumbmaster places their thumb on the table, everyone must follow — last one to do it drinks. The role stays until the next 9 is drawn' },
    { title: 'Dudes', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You are the Question Master. If someone answers a question from you, he has to drink' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'King\'s Cup', description: 'Pour some of your drink into the Cup. Who picks the last King drinks the cup.' },
  ];

title: string = "";
description: string = "";
@Input() card: string = '';

ngOnChanges():void{
  if(this.card){
     console.log('current Card', this.card,'Current Card Type', this.card.split(/[_\.]/));
  let cardNumber = +this.card.split(/[_\.]/)[1];
  this.title = this.cardAction[cardNumber - 1].title;
  this.description = this.cardAction[cardNumber - 1].description;
  }
 
}

}
