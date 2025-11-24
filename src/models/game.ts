export class Game {
  public players: string[] = [];
  public playerImages: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public stackCount = [1,2,3,4,5,6,7,8.9,10];

  constructor() {
    for(let i=1; i < 14; i++){
          this.stack.push('ace_' + i + '.png');
          this.stack.push('clubs_' + i + '.png');
          this.stack.push('diamonds_' + i + '.png');
          this.stack.push('hearts_' + i + '.png');
    }
    shuffle(this.stack);


  }

public toJSON(){
    return {
      players: this.players,
      playerImages: this.playerImages,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer
    };
  } 
}

function shuffle(array: string[]){
  var currentIndex = array.length, temporaryValue,randomIndex;

  while (0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
  }
  return array;
}


