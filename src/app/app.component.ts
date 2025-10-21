
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
// import { AsyncPipe } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kings-cup';
    firestore: Firestore = inject(Firestore);
}

