import { Component, Input, OnInit } from '@angular/core';

import Slot from './Engine/Slot';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  @Input() gameData: any;

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
      this.changeSymbols();
      if (this.autoSpin == true) {
        setTimeout(() => {
          this.onSpin();
        }, 1);
      }
    },
  };

  changeSymbols() {
    let arr = this.gameData.changedMatrix;
    for (let i=0; i<arr.length; i++) {
      let reel = document.getElementsByClassName('reel')[i];
      for ( let j=0; j<arr[i].length; j++) {
        let img = reel.getElementsByTagName("img")[j];
        let imgTag = img.src;
        let srcArr = imgTag.split('/');
        let symbol = srcArr[srcArr.length-1].split('.')[0];
        if(symbol !== arr[i][j]) {
          imgTag = imgTag.replace(symbol,arr[i][j]);
          img.src = imgTag;
        }
      }
    }
  }


  ngOnInit(): void {
    this.slot = new Slot(document.getElementById('reels'), this.config);
  }

  onSpin(autoSpin: boolean = false): void {
    if (this.spinning == false) {
      this.slot?.spin(this.gameData.initialMatrix);
    } else {
      if (autoSpin == false) {
        this.autoSpin = false;
      }
    }
  }

  onAutoSpin() {
    this.autoSpin = true;
    if (this.spinning == false) {
      this.onSpin();
    } else {
      this.autoSpin = false;
    }
  }

}
