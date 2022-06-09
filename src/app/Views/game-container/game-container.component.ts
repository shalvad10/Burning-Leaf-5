import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent extends ComponentBase implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  @ViewChild('gameContainer') game: any;

  @Input() gameData: any;
  @Input() data: any;
  @Input() lines: any;

  ngOnInit(): void {
  }

  onSpin() {
    this.game.onSpin();
  }

}
