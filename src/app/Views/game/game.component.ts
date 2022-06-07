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
  public canChange: boolean = true;

  public config = {
    inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
    onSpinStart: (symbols: any) => {
      console.log("onSpinStart", symbols);
      const reels = document.getElementsByClassName('reel');
        for (let i = 0; i < reels.length; i++) {
          if (this.gameData.bonusLeafLines.includes(i)) {
            reels[i].classList.toggle('bonus');
          }
        }
      this.spinning = true;
    },
    onSpinEnd: (symbols: any) => {
      console.log("onSpinEnd", symbols, this.autoSpin);
      this.spinning = false;
      this.changeSymbols();
      const reels = document.getElementsByClassName('reel');
      for (let i = 0; i < reels.length; i++) {
        reels[i].classList.remove('bonus');
      }
      // if (this.autoSpin == true) {
      //   setTimeout(() => {
      //     this.emitAction('autoSpin');
      //   }, 1);
      // }
    },
  };

  public changeSymbols() {
    let arr = this.gameData.changedMatrix;
    Promise.allSettled(
      arr.map((matrix:any, ind: number) => {
        matrix.map( (matrixEl: any, index: number) => {
          setTimeout(() => {
            return this.change({ symbol: matrixEl, symbolIndex: index, reelIndex: ind})
          }, 200 * (index + ind));
        })
      })
    ).then(() => setTimeout(() => { this.checkWin(SharedMethods.checkWin(this.gameData)) }, 2000 ));
  }

  public change(data: any) {
      let reel = document.getElementsByClassName('reel')[data.reelIndex];
      let img = reel.getElementsByTagName("img")[data.symbolIndex];
      let imgTag = img.src;
      let srcArr = imgTag.split('/');
      let symbol = srcArr[srcArr.length-1].split('.')[0];
      if(symbol !== data.symbol) {
        imgTag = imgTag.replace(symbol,data.symbol);
        img.src = imgTag;
        this.slot?.animateReel(data.reelIndex, data.symbolIndex);
      }
  }

  public checkWin(data: WinnObject[]) {
    Promise.allSettled(
      data.map((winObj:any, ind: number) => {
        setTimeout(() => {
            return this.showWin(winObj);
            // return winObj.lineId == 4 ? this.showWin(winObj) : {};
        }, 1500 * ind);
      })
    ).then(() => {});
  }

  public showWin(data: WinnObject) {
    if (data) {
      let reels = document.getElementsByClassName('reel');
      var symbolsCount = 0;
        if (data.winType == 'line') {
          let winningLines = this.lines[`line${data.lineId}`];
          for (let i = 0; i < reels.length; i++) {
            let allowBorder = true;
            for (let j = 0; j< winningLines.length; j++) {
              if( i == winningLines[j][1] ){
                if (allowBorder == true) {
                  if (reels[i].firstChild?.childNodes[winningLines[j][0]]) {
                      let srcArr = (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).getAttribute('src')?.split('/');
                      let symbol = srcArr ? srcArr[srcArr.length-1].toString().split('.')[0] : '';
                       if ( (symbol === 'leaf' || symbol === data.symbol) && data.symbolCount >= symbolsCount) {
                        symbolsCount++;
                        (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).style.cssText = `
                        width: calc(100% - 10px);
                        height: calc(100% - 10px);
                        border: 5px solid rgb(23, 202, 23);
                        `;
                        setTimeout( () => {
                          (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).style.cssText = `
                          width: 100%;
                          height: 100%;
                          border: none;
                          `;
                        }, 1100);
                      } else {
                        allowBorder = false;
                      }
                  }
                }
              }
            }
          }
        } else {
            for (let i = 0; i < reels.length; i++) {
              let childNodes: any = reels[i].childNodes;
              for (let j = 0; j<childNodes.length; j++) {
                let images = childNodes[j].childNodes;
                for (let l = 0; l<images.length; l++) {
                  let srcArr = images[l].getAttribute('src')?.split('/');
                  let symbol = srcArr ? srcArr[srcArr.length-1].toString().split('.')[0] : '';
                  if (symbol === data.symbol) {
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
