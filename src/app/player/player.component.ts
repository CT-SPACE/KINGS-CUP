import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})

export class PlayerComponent implements OnInit {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Input() playerImage: string = 'profile-1.png'; // ✅ NEU hinzugefügt
  @Input() playerIndex: number = 0; // ✅ NEU hinzugefügt
  @Output() playerClicked = new EventEmitter<number>(); // ✅ NEU hinzugefügt

  
  constructor() { }

  ngOnInit(): void {

    
    // Initialization logic here (if needed)
  }
    onPlayerClick(): void {
    this.playerClicked.emit(this.playerIndex);
  }
}
