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
  title = 'slot-game';
  public app!: AppMain;


  constructor (ref: ChangeDetectorRef,private http: HttpClient) {
    super(ref);
    // this.http.post(`${environment.apiURL}/Public/login`, { playerName: 'test', password: '123'}).subscribe((data: any) => {
    //   console.warn(data);
    //   this.data.connection.sessionKey = data.sessionId;
    // });
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
          } else if (this.data.game.autoSpin.inProgress == true) {
            this.app.doAction({action: 'autoSpin', data: {inProgress: false, spinsCount: null}});
            this.data.game.spinning = false;
          } else if (this.data.game.spinning == false) {
            this.onSpin();
            this.data.game.spinning = true;
          } else {
            this.gameContainer.game.onStop();
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

  onAutoSpin() {
    this.gameContainer.game.onAutoSpin();
  }

  public get loading(): boolean {
    return this.data.loading;
  }

  handleAction (e: any) {
    console.error(e);
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
      this.onSpin();
    }
    this.app.doAction(e);
  }

  public get informationText() {
    return this.freeSpins > 0 ? `remaining freespins: ${this.freeSpins}`: (this.data.game.spinning ? '' : 'please place your bet' );
  }

  public get data() {
    return this.app.dataObject;
  }

  public get freeSpins() {
    return this.app.dataObject.game.freeSpins.count;
  }
}
