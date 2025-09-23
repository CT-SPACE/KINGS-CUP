import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
   inputData = '';

 @Input()card = {
    short: '',
    task: '',
    taskIcon: '',
    moodpic: '',
    type: '', 
    typeIcon: '', 
    color: '',

  };

  @Output()cardshort = new EventEmitter<string>();

//   emitName(){
//     this.cardshort.emit(this.card.short);
//   }

//   sendInputData(){
//   console.log(this.inputData);
//   this.card.emit(this.inputData);
//   this.inputData = '';
// }

}
