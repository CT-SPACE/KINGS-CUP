// import { Game, Card } from './../models/game';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})




export class GameService {
  // game: Game;
  constructor() { }

  gameCards = [
    {
      short: "A",
      task: "Alle trinken gleichzeitig, reihum darf man erst aufhören",
	moodpic: "waterfall"
    },
    {

      short: "2",
      task: "Wähle jemanden, der trinken muss",
	moodpic: "you"
    },
    {

      short: "3",
      task: "Du trinkst selbst",
	moodpic: "me"
    },
    {

      short: "4",
      task: "Alle berühren den Boden mit der Hand, Letzter trinkt",
	moodpic: "ground"
    },
    {

      short: "5",
      task: "Alle Männer trinken",
	moodpic: "boys"
    },

    {
      short: "6",
      task: "Alle Frauen trinken",
	moodpic: "girls"
    },

    {
      short: "7",
      task: "Hand hoch! Letzter trinkt",
	moodpic: "sky"
    },

    {
      short: "8",
      task: "Wähle jemanden – ihr trinkt ab jetzt immer gemeinsam",
	moodpic: "drink mate"
    },

    {
      short: "9",
      task: "Sag ein Wort, reihum wird gereimt",
	moodpic: "rhyme"
    },

    {
      short: "10",
      task: "Nenne eine Kategorie, reihum werden Beispiele genannt",
	moodpic: "category"
    },
    {
      short: "J",
      task: "Erfinde eine Regel – wer sie bricht, trinkt",
	moodpic: "newrule"
    },

    {
      short: "D",
      task: "Stelle Fragen – wer antwortet, trinkt",
	moodpic: "questionmaster"
    },

    {
      short: "K",
      task: "1.–3. Getränk in den Becher. 4. Trinkt den Mix!",
	moodpic: "kings-cup"
    }
]


typeList =[
{	
	type:"herz",
	typeIcon:"./assets/img/symbol_hearts.svg",
	color: "var(--cardColor-red)"
},
{	
	type:"blatt",
	typeIcon:"./../assets/img/symbol_spades.svg",
	color: "var(--cardColor-dark)"
},
{	
	type:"karo",
	typeIcon: "./../assets/img/symbol_diamonds.svg",
	color: "var(--cardColor-red)"
},
{	
	type:"kreuz",
	typeIcon:"-/../assets/img/symbol_clubs.svg",
	color: "var(--cardColor-dark)"
}
]	;

getAllCards = this.getCards();

  getCards(){
    let cards = [];
    for (let type of this.typeList) {
      for (let card of this.gameCards) {
        cards.push({
          ...card,
          type: type.type,
          typeIcon: type.typeIcon,
          color: type.color
        });
      }
}   return cards;
  }

// beginGame(cards: Card[]) {
//     this.game = this.game.startGame(cards);
//   }

//   drawCard(): Card | null {
//     return this.game.getNextCard(this.game);
//   }
}
