import { ConnEnums    } from '../Enums/ConnEnums';
import { Sender } from '../Actions/Sender';
import SharedMethods from '../Actions/SharedMethods';
import { Sounds } from '../Libs/sounds';

export default abstract class BaseResponseHandler {

  constructor(public data: any, public sender: Sender) { }

  public onConnected() {
    this.data.connection.connected = true;

    this.sender.login();
  }

  public onDisconnected() {
    this.data.connection.connected  = false;
    this.data.gameTables            = [];
    this.data.tournamentTables      = [];
  }

  public onError(code:any, key:any, msg:any) {
    switch (code) {
      case ConnEnums.errorCodes.PlayerExists: 
      case ConnEnums.errorCodes.PlayerNotFound:
      case ConnEnums.errorCodes.Exception: {
        this.data.modal.currentModal = 'info';
        this.data.modal.modalParams[this.data.modal.currentModal].infoText = msg;
        this.sender.enableReconnect(false);
        this.data.loading = false;
        this.data.game.gameLoaded = false;
      }
    }
  }

  public handleResponses(code: number, data: any): void {
    switch (code) {
      case ConnEnums.operations.Login               : { this.login(data);         break; }
      case ConnEnums.operations.Spin                : { this.spin(data);          break; }
      case ConnEnums.operations.BuyFreeSpin         : { this.buyFreeSpin(data);   break; }
    }
  }

  public login(data: any): void {
    console.warn('LOGIN', data);
    this.data.user.userName   = data.PlayerName;
    this.data.user.balance    = data.Balance / this.data.ammountDivide;
    setTimeout(() => {
      this.data.loading         = false;
      this.data.game.gameLoaded = true;
    }, 5000);
  }

  public spin(data: any): void {
    this.data.game.initialMatrix    = SharedMethods.generateArrFromObj(data.InitialMatrix);
    this.data.game.changedMatrix    = SharedMethods.generateArrFromObj(data.FinalMatrix);
    this.data.game.specialSymbols   = data.Scatters;
    this.data.game.lines            = data.Lines;
    setTimeout(() => {
      setTimeout(() => {
        if (data.WonAmount > 0) {
          Sounds.instance.play('win');
          if(this.data.game.freeSpins.isActive == false) {
            this.data.game.freeSpins.won = 0;
            this.data.game.wonAmmount = data.WonAmount / this.data.ammountDivide;
          }
        }
      }, 1);
    }, 3000);
  }

  public buyFreeSpin(data: any): void {
    this.data.game.freeSpins.showPopup = true;
    this.data.modal.currentModal = '';
  }
}
