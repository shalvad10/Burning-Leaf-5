import { Sender } from './Sender';

export default class Actions {
  
  constructor(public data: any, public sender: Sender) {}

  public onAction(type: string, data: any) {

    console.warn(type,data);

    switch (type) {
      case 'spin'           : { this.spin();                break; }
      case 'selectNominale' : { this.selectNominale(data);  break; }
      case 'selectBet'      : { this.selectBet(data);       break; }
      case 'buyFreeSpin'    : { this.buyFreeSpin(data);     break; }
      case 'toggleModal'    : { this.toggleModal(data);     break; }
      case 'closeGame'      : { this.closeGame();           break; }
      case 'spinning'       : { this.spinning(data);        break; }
      case 'addToBalance'   : { this.addToBalance(data);    break; }
      case 'autoSpin'       : { this.autoSpin(data);        break; }
      // case 'toggleTabs'             : { this.toggleTab(data);                     break; }
      // case 'joinGame'               : { this.joinGame(data);                      break; }
      // case 'openModal'              : { this.toggleModal(data);                   break; }
      // case 'filterTables'           : { this.Filter(data);                        break; }
      // case 'getTournamentTables'    : { this.getTournamentTables(data);           break; }
      // case 'setPlayerSettings'      : { this.setPlayerSettings(false, data);      break; }
      // case 'resetPlayerSettings'    : { this.setPlayerSettings(true, data);       break; }
      // case 'createBuraGame'         : { this.createGame(data);                    break; }
      // case 'createBackgammonGame'   : { this.createGame(data);                    break; }
      // case 'selectTournemant'       : { this.selectTournament(data);              break; }
      // case 'changeGame'             : { this.changeGame(data);                    break; }
      // case 'rakebackExchange'       : { this.rakebackExchange(data);              break; }
      // case 'tournamentInfo'         : { this.onTournament(data);                  break; }
      // case 'openHistory'            : { this.openHistory(data);                   break; }
      // case 'mytournaments'          : { this.myTournaments(data);                 break; }
      // case 'changeColors'           : { this.changeColors(data);                  break; }
      // case 'changeMoney'            : { this.changeMoney(data);                   break; }
      // case 'freeBet'                : { this.freeBet(data);                       break; }
      // case 'sortTables'             : { this.sortTables(data);                    break; }
    }
  }

  public autoSpin(data: any) {
    this.data.game.autoSpin.inProgress      = data.inProgress;
    this.data.game.autoSpin.infiniteLoop    = data.spinsCount == null;
    this.data.game.autoSpin.spinsRemaining  = data.spinsCount == null ? 0 : data.spinsCount;
  }

  public spinning(data: boolean):void {
    this.data.game.spinning = data;
  }

  public addToBalance(data: any): void {
    this.data.user.balance = ((Number.parseFloat(this.data.user.balance) + Number.parseFloat(this.data.user.balanceTohold)).toFixed(2)).toString();
    this.data.user.holdBalance = false;
    this.data.user.balanceTohold = 0;
  }

  public spin(): void {
    this.spinning(true);
    if (this.data.game.freeSpins.count == 0) {
      this.sender.spin(this.data.game.selectedBet * this.data.ammountDivide);
    } else {
      this.sender.freeSpin(this.data.game.freeSpins.bet * this.data.ammountDivide);
    }
    // if (this.data.modal.savedModal !== '') {
    //   this.data.modal.currentModal = this.data.modal.savedModal;
    //   this.data.modal.savedModal = '';
    // }
  }

  public closeGame(): void {
    window.close();
  }

  public selectNominale(data: any): void {
    this.data.game.selectedNominale = data;
    this.data.game.selectedBet = data * this.data.game.betMultipliers[this.data.game.selectedMultiplierIndex] * this.data.game.gameLine;
  }

  public buyFreeSpin(data: any): void {
    console.warn(data);
    this.data.game.selectedNominale = data.nominale;
    this.data.game.selectedBet = data.bet;
    this.data.game.selectedMultiplierIndex = data.multiplier
    this.sender.buyFreeSpin(data.freeSpinType, data.bet * this.data.ammountDivide);
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
