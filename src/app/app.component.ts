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
      // console.warn(data);
      // this.data.connection.sessionKey = data.sessionId;
    // });
    this.app = new AppMain();

    // console.log(this.app.dataObject);
    // this.app.dataObject.modal.currentModal = '';
    setTimeout( () => {
      // console.error(this.app.dataObject);
      // this.app.dataObject.modal.currentModal = 'avatars';
    }, 2000);
  }

  @ViewChild('gameContainer') gameContainer: any;

  onSpin() {
    this.app.doAction({action: 'spin', data: {}});
    setTimeout(() => {
      this.gameContainer.game.onSpin();
    }, 1000);
  }

  onAutoSpin() {
    this.gameContainer.game.onAutoSpin();
  }

  handleAction (e: any) {
    this.app.doAction(e);
    if (e.action == 'selectBet') {
      setTimeout(() => {
        this.gameContainer.game.onSpin();
      }, 1000);
    }
  }

  public get data() {
    return this.app.dataObject;
  }
}
