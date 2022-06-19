import { ConnEnums    } from '../Enums/ConnEnums';
import { Sender } from '../Actions/Sender';

export default abstract class BaseEventHandler {
  constructor(private data: any, private sender: Sender) { }

  public handleEvents(code: number, data: any): void {
    switch (code) {
      case ConnEnums.events.RemainingFreeSpins    : { this.remainingFreespins(data);  break; }
      case ConnEnums.events.BalanceUpdated        : { this.updateBalance(data);       break; }
      case ConnEnums.events.FreeSpinTypes         : { this.freeSpinTypes(data);       break; }
      case ConnEnums.events.BonusLeafLines        : { this.bonusleaflines(data);      break; }
      // case ConnEnums.events.RejoinTables          : { this.setRejoinTables(data);     break; }
      // case ConnEnums.events.OnlinePlayersEvent    : { this.setLobbyInfo(data);        break; }
      // case ConnEnums.events.PlayerSettings        : { this.setPlayerSettings(data);   break; }
      // case ConnEnums.events.TournamentListEvent   : { this.setTournaments(data);      break; }
      // case ConnEnums.events.TournamentUpdate      : { this.updateTournaments(data);   break; }
      // case ConnEnums.events.OpenTournament        : { this.openTournament(data);      break; }
      // case ConnEnums.events.PlayerHistoryMatchList: { this.onHistoryList(data);       break; }
      // case ConnEnums.events.MatchesEnableState    : { this.changeMatchesState(data);  break; }
      // case ConnEnums.events.MyTournaments         : { this.setMyTournaments(data);    break; }
    }
  }

  public bonusleaflines(data: any): void {
    this.data.game.bonusLeafLines = data.Array;
    console.warn(this.data.game.bonusLeafLines);
  }

  public remainingFreespins(data: any): void {
    this.data.game.freeSpins.isActive = data.FreespinsCount > 0;
    this.data.game.freeSpins.count = data.FreespinsCount;
    this.data.game.freeSpins.bet = data.BetAmmount / this.data.ammountDivide;
    this.data.game.freeSpins.typeID = data.FrespinTypeID;
    // this.data.game.freeSpins.oldWin = this.data.game.freeSpins.won;
    // setTimeout(() => {
      this.data.game.freeSpins.won = data.WonAmount > 0 ? data.WonAmount / this.data.ammountDivide : 0;
    // }, 1);

    if (this.data.game.freeSpins.showPopup == true || data.FreespinsCount == 0) {
      let freesPinType = this.data.freespinTypes.filter( (frsp:any) => frsp.typeID ==data.FrespinTypeID)[0];
      if(data.FreespinsCount == 0) {
        this.data.modal.savedModal = 'bonus_win';
        let modal = this.data.modal.modalParams[this.data.modal.savedModal];
        modal.ammount = data.WonAmount / this.data.ammountDivide;
        this.data.game.bonusLeafLines = [];
        this.data.game.autoSpin.inProgress      = false;
        this.data.game.autoSpin.infiniteLoop    = false;
        this.data.game.autoSpin.spinsRemaining  = data.spinsCount == null ? 0 : data.spinsCount;
      } else if (data.FreespinsCount == freesPinType.freeSpinCount) {
        this.data.modal.currentModal = 'bonus_type';
        let modal = this.data.modal.modalParams[this.data.modal.currentModal];
        modal.headText = 'YOU BOUGHT';
        modal.infoText =`${data.FreespinsCount} Free Spins for ${(data.BetAmmount / this.data.ammountDivide) * freesPinType.price}`;
        modal.data.typeID = data.FrespinTypeID;
      } else {
        this.data.modal.currentModal = 'bonus_type';
        let modal = this.data.modal.modalParams[this.data.modal.currentModal];
        modal.headText = '';
        modal.infoText =`${data.FreespinsCount} Free Spins reamining`;
        modal.data.typeID = data.FrespinTypeID;
        modal.data.freespinsCount = data.FreespinsCount;
      }
      this.data.game.freeSpins.showPopup = false;
    }

  }

  public freeSpinTypes(data: any): void {
    this.data.freespinTypes = [];
    data.Array.sort((a: any,b: any) => a.FrespinTypeID - b.FrespinTypeID).forEach((freespin:any) => {
      this.data.freespinTypes.push({
        freeSpinCount: freespin.FreespinsCount,
        typeID: freespin.FrespinTypeID,
        price: freespin.Rate,
        minLeafs: freespin.Minimum,
        maxLeafs: freespin.Maximum
      });
    });
  }

  public updateBalance(data: any): void {
    if (this.data.user.holdBalance == true) {
      this.data.user.balanceTohold = ((data.Balance / this.data.ammountDivide) - this.data.user.balance).toFixed(2);
    } else {
      this.data.user.oldBalance = this.data.user.balance;
      this.data.user.balance = (data.Balance / this.data.ammountDivide).toFixed(2);
    }
  }
}
