import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/Base/ComponentBase';
import SharedMethods, { WinnObject } from 'src/app/Services/Actions/SharedMethods';

import Slot from './Engine/Slot';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends ComponentBase implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
    super(ref);
  }

  @Input() gameData: any;
  @Input() lines: any;

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
      this.showWin(SharedMethods.checkWin(this.gameData));
      // if (this.autoSpin == true) {
      //   setTimeout(() => {
      //     this.emitAction('autoSpin');
      //   }, 1);
      // }
    },
  };

  public changeSymbols() {
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

  public showWin(data: WinnObject[]) {
    console.warn(data);
    if (data.length > 0) {
      let reels = document.getElementsByClassName('reel');
      for (let k = 0; k < data.length; k++) {
        if (data[k].winType == 'line') {
          var symbolsCount = 0;
          let winningLines = this.lines[`line${data[k].lineId}`];
          for (let i = 0; i < reels.length; i++) {
            let allowBorder = true;
            for (let j = 0; j< winningLines.length; j++) {
              if( i == winningLines[j][1] ){
                console.warn(reels[i]);
                console.warn(reels[i].firstChild);
                console.warn(reels[i].firstChild?.childNodes[winningLines[j][0]]);
                console.warn(allowBorder);
                if (allowBorder == true) {
                  if (reels[i].firstChild?.childNodes[winningLines[j][0]]) {
                      let srcArr = (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).getAttribute('src')?.split('/');
                      let symbol = srcArr ? srcArr[srcArr.length-1].toString().split('.')[0] : '';
                      console.warn(symbol, data[k].symbol);
                      if ( symbol === 'leaf' || symbol === data[k].symbol) {
                        symbolsCount++;
                        (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).style.cssText = `
                        width: calc(100% - 10px);
                        height: calc(100% - 10px);
                        border: 5px solid rgb(23, 202, 23);
                        `;
                      } else {
                        allowBorder = false;
                      }
                  }
                }
              }
            }
          }
        } else {
          console.warn('DATA', data);
          for (let k = 0; k < data.length; k++) {
            console.warn('ALL REELS',reels);
            for (let i = 0; i < reels.length; i++) {
              let allowBorder = true;
              let childNodes: any = reels[i].childNodes;
              console.warn('SINGLE REEL',reels[i]);
              console.warn('REEL CHILD NODES', childNodes);
              for (let j = 0; j<childNodes.length; j++) {
                let images = childNodes[j].childNodes;
                console.warn('IMAGES', childNodes);
                for (let l = 0; l<images.length; l++) {
                  console.warn('SINGLE IMAGE', images[l]);
                  let srcArr = images[l].getAttribute('src')?.split('/');
                  console.warn('SINGLE IMAGE SRC ARRAY', srcArr);
                  let symbol = srcArr ? srcArr[srcArr.length-1].toString().split('.')[0] : '';
                  console.warn('SINGLE IMAGE SYMBOL FROM SRC', srcArr);
                  if (  symbol === data[k].symbol) {
                    images[l].style.cssText = `
                    width: calc(100% - 10px);
                    height: calc(100% - 10px);
                    border: 5px solid rgb(23, 202, 23);
                    `;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  public get maxSymbols() {
    return this.gameData.wonSymbolsCount;
  }


  ngOnInit(): void {
    this.slot = new Slot(document.getElementById('reels'), this.config);
  }

  onSpin(): void {
    console.warn(this.spinning, this.autoSpin);
    if (this.spinning == false) {
      this.slot?.spin(this.gameData.initialMatrix);
    } else {
      if (this.autoSpin == true) {
        this.autoSpin = false;
      }
    }
  }

  onAutoSpin() {
    // this.autoSpin = true;
    // if (this.spinning == false) {
    //   this.emitAction('autoSpin');
    // } else {
    //   this.autoSpin = false;
    // }
  }

}
