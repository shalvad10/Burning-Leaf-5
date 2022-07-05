import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComponentBase } from './Base/ComponentBase';
import { AppMain } from './Services/AppMain';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase {
  
  public app!: AppMain;


  constructor (ref: ChangeDetectorRef,private http: HttpClient) {
    super(ref);
    this.http.post(`${environment.apiURL}/Public/login`, { playerName: 'test', password: '123'}).subscribe((data: any) => {
      console.warn(data);
      this.data.connection.sessionKey = data.sessionId;
    });
    this.app = new AppMain();

    // console.log(this.app.dataObject);
    // this.app.dataObject.modal.currentModal = '';
    setTimeout( () => {
      // console.error(this.app.dataObject);
      // this.app.dataObject.modal.currentModal = 'avatars';
    }, 2000);
    document.addEventListener('keypress', (e) => {
      if (this.app.dataObject.game.gameLoaded == true) {
        if ( e.keyCode == 32) {
          if (this.data.user.holdBalance == true) {
            this.app.doAction({action: 'addToBalance',data:{}});
          } else if (this.data.game.spinning == false) {
            this.onSpin();
            // this.gameContainer.game.onStop();
            this.data.game.spinning = true;
          } else {
            this.gameContainer.game.onStop();
            this.data.game.stopBTNCount++;
            if (this.data.game.stopBTNCount == 2) {
              // if (this.data.game.showWin == true) {
              //   console.error('HERE')
              //   this.data.game.showWin = false;
              //   this.data.game.cancelAnimations = true;
              // }
            }
          }
        }
      }
    });
  }

  @ViewChild('gameContainer') gameContainer: any;

  onSpin() {
    this.app.doAction({action: 'spin', data: {}});
    if (this.data.user.holdBalance == false) {
      setTimeout(() => {
          this.gameContainer.game.onSpin();
      }, 500);
    }
  }

  onAutoSpin(ev: any) {
    this.gameContainer.game.onAutoSpin(ev);
  }

  public get loading(): boolean {
    return this.data.loading;
  }

  public get winninSymbols() {
    if (this.data.game.winningInfo) {
      this.data.game.winningInfo.symbols = [];
      for (let i = 0; i < this.data.game.winningInfo.symbolCount; i++) {
        this.data.game.winningInfo.symbols.push(this.data.game.winningInfo.symbol)
      }
    }
    return this.data.game.winningInfo;
  }

  handleAction (e: any) {
    if (e.action == 'selectBet') {
      if (this.data.user.holdBalance == true) {
        this.app.doAction({action: 'addToBalance',data:{}});
      } else if (this.data.game.spinning == false) {
          if (this.data.game.autoSpin.inProgress == true) {
            this.app.doAction({action: 'autoSpin', data: {inProgress: false, spinsCount: null}});
          } else {
            setTimeout(() => {
              this.gameContainer.game.onSpin();
              this.data.game.spinning = true;
            }, 500);
          }
      }
    } else if (e.action == 'stopSpin') {
      this.gameContainer.game.onStop();
    } else if (e.action == 'autoSpin') {
      if (e.data.inProgress == true) {
        this.onSpin();
      }
    }
    this.app.doAction(e);
  }

  public get informationText() {
    return this.freeSpins >= 0 ? `remaining freespins: ${this.freeSpins}`: (this.data.game.spinning ? '' : 'please place your bet' );
  }

  public returnSymbols(symbol: string, count: number): string {
    let tmp = '';
    for(let i = 0; i<count; i++) {
      tmp+= `<div class='symbol_small_icon ${symbol}'></div>`;
    }
    return tmp;
  }


  public get data() {
    return this.app.dataObject;
  }

  public get freeSpins() {
    return this.app.dataObject.game.freeSpins.count;
  }
}
