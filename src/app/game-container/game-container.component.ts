import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit {

  @ViewChild('gameContainer') game: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSpin() {
    this.game.onSpin();
  }

}
