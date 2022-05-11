import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slot-game';

  @ViewChild('gameContainer') gameContainer: any;

  onSpin() {
    this.gameContainer.game.onSpin();
  }

  onAutoSpin() {
    this.gameContainer.game.onAutoSpin();
  }
}
