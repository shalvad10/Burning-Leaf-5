import { Component, OnInit } from '@angular/core';

import Slot from './Engine/Slot';
import Symbol from './Engine/Symbol';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  public slot?: Slot;

  public autoSpin: boolean = false;
  public spinning: boolean = false;

  public config = {
    inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
    onSpinStart: (symbols: any) => {
      console.log("onSpinStart", symbols);
      this.spinning = true;
    },
    onSpinEnd: (symbols: any) => {
      console.log("onSpinEnd", symbols, this.autoSpin);
      this.spinning = false;
      if (this.autoSpin == true) {
        setTimeout(() => {
          this.onSpin();
        }, 1);
      }
    },
  };


  ngOnInit(): void {
    this.slot = new Slot(document.getElementById('reels'), this.config);
  }

  onSpin(autoSpin:boolean = false): void {
    if ( this.spinning == false) {
      this.slot?.spin(this.renderSymbols());
    } else {
      if ( autoSpin == false) {
        this.autoSpin = false;
      }
    }
  }
  
  onAutoSpin() {
      this.autoSpin = true;
      if ( this.spinning == false) {
        this.onSpin();
      } else {
        this.autoSpin = false;
      }
  }

  public renderSymbols() {
    return [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];
  } 

}
