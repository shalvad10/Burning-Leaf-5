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

  @Input() data: any;
  @Input() gameData: any;
  @Input() lines: any;

  public slot?: Slot;

  public autoSpin: boolean = false;
  public canChange: boolean = true;
  public winningLines!: WinnObject[];

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
    },
    onSpinEnd: (symbols: any) => {
      console.log("onSpinEnd", symbols, this.autoSpin);
      this.changeSymbols();
      const reels = document.getElementsByClassName('reel');
      for (let i = 0; i < reels.length; i++) {
        reels[i].classList.remove('bonus');
      }
      this.gameData.spinning = false;
      // if (this.autoSpin == true) {
      //   setTimeout(() => {
      //     this.emitAction('autoSpin');
      //   }, 1);
      // }
    },
  };

  public get spinning() {
    return this.gameData.spinning;
  }

  public changeSymbols() {
    let arr = this.gameData.changedMatrix;
    this.winningLines = SharedMethods.checkWin(this.gameData);
    Promise.allSettled(
      arr.map((matrix:any, ind: number) => {
        matrix.map( (matrixEl: any, index: number) => {
          setTimeout(() => {
            return this.change({ symbol: matrixEl, symbolIndex: index, reelIndex: ind})
          }, 200 * (index + ind));
        })
      })
    ).then(() => setTimeout(() => { this.checkWin(this.winningLines) }, 2000 ));
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
      data.map((winObj: any, ind: number) => {
        setTimeout(() => {
          return this.showWin(winObj, ind);
        }, 800 * ind);
      })
    );
  }

  public showWin(data: WinnObject, index: number) {
    if (data) {
      let reels = document.getElementsByClassName('reel');
      var symbolsCount = 1;
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
                        }, 600);
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
        if (index === this.winningLines.length-1 && this.data.user.holdBalance == true) {
          setTimeout(() => {
            this.checkWin(this.winningLines);
          }, 800);
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
    this.slot?.spin(this.gameData.initialMatrix);
      if (this.autoSpin == true) {
        this.autoSpin = false;
      }
  }

  onStop() {
    this.slot?.stop(this.gameData.initialMatrix);
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
