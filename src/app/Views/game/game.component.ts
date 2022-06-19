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
  public spinStarted: boolean = false;

  public canChange: boolean = true;
  public winningLines!: WinnObject[];
  public winningSpecials!: WinnObject[];
  public animatingBorders: any = [];

  public config = {
    inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
    onSpinStart: (symbols: any) => {
      this.emitAction('winText', undefined);
      this.spinStarted = true;
      this.winningLines = [];
      this.winningSpecials = [];
      console.log("onSpinStart", symbols);
      const reels = document.getElementsByClassName('reel');
        for (let i = 0; i < reels.length; i++) {
          if (this.gameData.bonusLeafLines.includes(i)) {
            reels[i].classList.toggle('bonus');
          }
        }
    },
    onSpinEnd: (symbols: any) => {
      Promise.allSettled( this.animatingBorders.map( (br: any) => {
        return this.slot?.cancelBorderAnimation(br);
      })).finally( () => {
        if (this.spinStarted == true) {
          this.spinStarted = false;
          console.log("onSpinEnd", symbols, this.autoSpin);
          this.winningLines = SharedMethods.checkWin(this.gameData, this.data.ammountDivide);
          this.winningSpecials = SharedMethods.checkSpecialWin(this.gameData, this.data.ammountDivide);
          if (this.winningSpecials.length > 0) {
            Promise.allSettled(
              this.winningSpecials.map((winObj: any, ind: number) => {
                if (winObj.winType == 'special') {
                  setTimeout(() => {
                    return this.showSpecial(winObj, ind);
                  }, 800 * ind);
                }
              })
            ).then(() => {
              if (this.winningLines.length == 0) {
                console.warn('FROM SPECIAL SYMBOLS THEN', this.autoSpin == true);
                if (this.autoSpin == true) {
                  if (this.gameData.showWin == true) {
                    setTimeout(() => {
                      if (this.data.game.autoSpin.spinsRemaining - 1 >= 0) {
                        this.emitAction('autoSpin', { inProgress: true, spinsCount: this.data.game.autoSpin.spinsRemaining - 1 });
                      } else {
                        this.emitAction('spinning', false);
                      }
                    }, 100);
                  }
                } else {
                  setTimeout(() => {
                    this.emitAction('spinning', false);
                  }, 10);
                }
              }
            });
          } else {
            this.changeSymbols();
          }
          const reels = document.getElementsByClassName('reel');
          for (let i = 0; i < reels.length; i++) {
            reels[i].classList.remove('bonus');
          }
          // if (this.gameData.showWin == false) {
          //   console.warn('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
          //   // setTimeout(() => {
          //     this.emitAction('spinning', false);
          //   // }, 10);
          // }
        }
      })
    }
  };

  public get autoSpin() {
    return this.data.game.autoSpin.inProgress;
  }

  public get spinning() {
    return this.gameData.spinning;
  }

  public changeSymbols() {
    console.warn('CHANGE SYMBOLS');
    let arr = this.gameData.changedMatrix;
    if (SharedMethods.matricCheck(this.gameData.initialMatrix , this.gameData.changedMatrix) == false) {
      Promise.allSettled(
        arr.map((matrix:any, ind: number) => {
          matrix.map( (matrixEl: any, index: number) => {
            setTimeout(() => {
              return this.change({ symbol: matrixEl, symbolIndex: index, reelIndex: ind})
            }, 200 * (index + ind));
          })
        })
      ).finally(() => setTimeout(() => { 
        if(this.winningLines.length > 0) {
          this.checkWin(this.winningLines);
        } else {
          console.warn('FROM CHANGE SYMBOLS THEN CHANGING', this.autoSpin == true);
          if (this.autoSpin == true) {
            if (this.gameData.showWin == true) {
              setTimeout(() => {
                if (this.data.game.autoSpin.spinsRemaining - 1 >= 0) {
                  this.emitAction('autoSpin', { inProgress: true, spinsCount: this.data.game.autoSpin.spinsRemaining - 1 });
                } else {
                  this.emitAction('spinning', false);
                }
              }, 10);
            }
          } else if (this.data.modal.savedModal !== '') {
            setTimeout(() => {
              this.data.modal.currentModal = this.data.modal.savedModal;
              this.data.modal.savedModal = '';
              this.emitAction('spinning', false);
            }, 500);
          } else {
            setTimeout(() => {
              this.emitAction('spinning', false);
            }, 10);
          }
        }
      }, 1000 ));
    } else {
      if(this.winningLines.length > 0) {
        console.error('AQEDAN ARIS DZMAAAAAAAAAAAAAAAA')
        this.checkWin(this.winningLines);
      } else {
        console.warn('FROM CHANGE SYMBOLS THEN NOT CHANGING', this.autoSpin == true);
        if (this.autoSpin == true) {
          if (this.gameData.showWin == true) {
            setTimeout(() => {
              if (this.data.game.autoSpin.spinsRemaining - 1 >= 0) {
                this.emitAction('autoSpin', { inProgress: true, spinsCount: this.data.game.autoSpin.spinsRemaining - 1 });
              } else {
                this.emitAction('spinning', false);
              }
            }, 10);
          }
        } else if (this.data.modal.savedModal !== '') {
          setTimeout(() => {
            this.data.modal.currentModal = this.data.modal.savedModal;
            this.data.modal.savedModal = '';
            this.emitAction('spinning', false);
          }, 500);
        } else {
          setTimeout(() => {
            this.emitAction('spinning', false);
          }, 10);
        }
      }
    }
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
        return this.showWin(winObj, ind);
      })
    );
  }

  public showWin(data: WinnObject, index: number) {
    if (data !== undefined) {
      let reels = document.getElementsByClassName('reel');
      var symbolsCount = 1;
      let winningLines = this.lines[`line${data.lineId}`];
      if (winningLines) {
        for (let i = 0; i < reels.length; i++) {
          let allowBorder = true;
          for (let j = 0; j < winningLines.length; j++) {
            if (i == winningLines[j][1]) {
              if (allowBorder == true) {
                if (reels[i].firstChild?.childNodes[winningLines[j][0]]) {
                  let srcArr = (reels[i].firstChild?.childNodes[winningLines[j][0]] as HTMLElement).getAttribute('src')?.split('/');
                  let symbol = srcArr ? srcArr[srcArr.length - 1].toString().split('.')[0] : '';
                  if ((symbol === 'leaf' || symbol === data.symbol) && data.symbolCount >= symbolsCount) {
                    symbolsCount++;
                    setTimeout(() => {
                      this.emitAction('winText', data);
                      console.warn(this.slot?.animateBorder(i, winningLines[j][0]));
                      this.animatingBorders.push(i);
                        setTimeout(() => {
                          this.slot?.cancelBorderAnimation(i);
                        }, 1000);
                    }, 1000);
                  } else {
                    allowBorder = false;
                  }
                }
              }
            }
          }
        }
      }
      if (index === this.winningLines.length - 1) {
        console.warn('FROM CHECK WIN THEN', this.autoSpin == true);
        if (this.autoSpin == true) {
          if (this.gameData.showWin == true) {
            setTimeout(() => { 
              if (this.data.game.autoSpin.spinsRemaining - 1 >= 0) {
                this.emitAction('autoSpin', { inProgress: true, spinsCount: this.data.game.autoSpin.spinsRemaining - 1 });
              } else {
                this.emitAction('spinning', false);
              }
            }, 1500);
          }
        } else if (this.data.modal.savedModal !== '') {
          setTimeout(() => {
            this.data.modal.currentModal = this.data.modal.savedModal;
            this.data.modal.savedModal = '';
            this.emitAction('spinning', false);
          }, 500);
        } else {
          setTimeout(() => {
            this.checkWin(this.winningLines);
            this.emitAction('spinning', false);
          }, 1500);
        }
      }
    }
  }

  public showSpecial(data: WinnObject, index: number) {
    let reels = document.getElementsByClassName('reel');
    for (let i = 0; i < reels.length; i++) {
      let childNodes: any = reels[i].childNodes;
      for (let j = 0; j<childNodes.length; j++) {
        let images = childNodes[j].childNodes;
        for (let l = 0; l<images.length; l++) {
          let srcArr = images[l].getAttribute('src')?.split('/');
          let symbol = srcArr ? srcArr[srcArr.length-1].toString().split('.')[0] : '';
          if (symbol === data.symbol) {
            this.emitAction('winText', data);
            images[l].style.cssText = `
            width: calc(100% - 4px);
            height: calc(100% - 4px);
            border: 2px solid rgb(255, 255, 255);
            `;
            setTimeout(() => {
              this.emitAction('winText', undefined);
              images[l].style.cssText = `
                width: 100%;
                height: 100%;
                border: none;
                `;
            }, 500);
            // setTimeout(() => {
            //   this.slot?.animateBorder(i, j);
            //     setTimeout(() => {
            //       this.slot?.cancelBorderAnimation(i);
            //     }, 1000);
            // }, 1000);
          }
        }
      }
    }
    if (index === this.winningSpecials.length - 1) {
      setTimeout(() => {
        this.changeSymbols();
      }, 1000);
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
  }

  onStop() {
    // this.stopAnimation();
    if (this.spinning == true){
      this.slot?.stop(this.gameData.initialMatrix);
    }
  }

  stopAnimation() {
    this.emitAction('spinning', false);
    if (this.autoSpin == true) {
      setTimeout(() => {
        // this.onAutoSpin();
      }, 10);
    }
  }

  onAutoSpin(num: any) {
    this.emitAction('autoSpin', {inProgress: true, spinsCount: num});
  }

}
