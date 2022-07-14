import { Sounds } from '../Libs/sounds';
import { Sender } from './Sender';

export default class Actions {
  
  constructor(public data: any, public sender: Sender) {}

  public onAction(type: string, data: any) {

    switch (type) {
      case 'spin'               : { this.spin();                  break; }
      case 'selectNominale'     : { this.selectNominale(data);    break; }
      case 'selectBet'          : { this.selectBet(data);         break; }
      case 'selectFreeSpin'     : { this.selectFreeSpin(data);    break; }
      case 'buyFreeSpin'        : { this.buyFreeSpin(data);       break; }
      case 'toggleModal'        : { this.toggleModal(data);       break; }
      case 'closeGame'          : { this.closeGame();             break; }
      case 'spinning'           : { this.spinning(data);          break; }
      case 'autoSpin'           : { this.autoSpin(data);          break; }
      case 'stopAutospin'       : { this.stopAutospin();          break; }
      case 'winText'            : { this.setWinText(data);        break; }
      case 'freespinsFinished'  : { this.finishFreespins();       break; }
      case 'toggleVolume'       : { this.toggleVolume(data);      break; }
      case 'animatingAmmount'   : { this.animatingAmmount(data);  break; }
    }
  }

  public animatingAmmount(data: boolean): void {
    this.data.game.ammount_animating  = data;
  }

  public toggleVolume(data: number):void {
    Sounds.instance.volume = data;
  }

  public finishFreespins():void  {
    this.data.game.freeSpins.count    = -1;
    this.data.game.freeSpins.maxCount = -1;
    this.data.game.freeSpins.isActive = false;
    this.data.user.balance            = this.data.user.balanceTohold;
  }

  public setWinText(data: any) {
    this.data.game.winningInfo = data;
  }

  public stopAutospin() {
    this.data.game.autoSpin.inProgress      = false;
    this.data.game.autoSpin.infiniteLoop    = false;
    this.data.game.autoSpin.spinsRemaining  = 0;
  }

  public autoSpin(data: any) {
    this.data.game.autoSpin.inProgress      = data.inProgress;
    this.data.game.autoSpin.infiniteLoop    = data.spinsCount == null;
    this.data.game.autoSpin.spinsRemaining  = data.spinsCount;
  }

  public spinning(data: boolean):void {
    this.data.game.spinning = data;
  }

  public spin(): void {
    Sounds.instance.play('start_spin');
    this.data.game.winningInfo = undefined;
    this.data.game.stopBTNCount = 0;
    if (this.data.game.spinning == false) {
      this.data.game.bonusLeafLines = [];
      if (this.data.game.freeSpins.count < 0) {
        this.sender.spin(this.data.game.selectedBet * this.data.ammountDivide);
      } else {
        this.sender.freeSpin(this.data.game.freeSpins.bet * this.data.ammountDivide);
      }
    }
    this.data.game.spinning = true;
  }

  public closeGame(): void {
    window.close();
  }

  public selectNominale(data: any): void {
    this.data.game.selectedNominale = data;
    this.data.game.selectedBet = data * this.data.game.betMultipliers[this.data.game.selectedMultiplierIndex] * this.data.game.gameLine;
  }

  public selectFreeSpin(data: any): void {
    this.data.modal.currentModal = 'bonus_type';
    let modal = this.data.modal.modalParams[this.data.modal.currentModal];
    modal.headText = 'YOU ARE BUYING';
    modal.infoText =`${data.freeSpinCount} Free Spins for ${data.price} ${this.data.user.currency}`;
    modal.data.typeID = data.FrespinTypeID;
    modal.data.firstBuy = true;
    this.data.game.selectedFreespin = data;
  }

  public buyFreeSpin(data: any): void {
    if (data == true) {
      this.data.game.selectedNominale = this.data.game.selectedFreespin.nominale;
      this.data.game.selectedBet = this.data.game.selectedFreespin.bet;
      this.data.game.selectedMultiplierIndex = this.data.game.selectedFreespin.multiplier
      this.data.game.freeSpins.won = 0;
      this.sender.buyFreeSpin(this.data.game.selectedFreespin.freeSpinType, this.data.game.selectedFreespin.bet * this.data.ammountDivide);
    } else {
      this.data.game.selectedFreespin = null;
    }
  }

  public selectBet(data: any): void {
    this.data.game.selectedBet = data.bet;
    this.data.game.selectedMultiplierIndex = data.index
    this.spin();
  }

  public toggleModal(data: any): void {
    this.data.modal.currentModal = data.modal;
  }

}
