import { ConnEnums    } from '../Enums/ConnEnums';
import { Sender } from '../Actions/Sender';

export default abstract class BaseEventHandler {
  constructor(private data: any, private sender: Sender) { }

  public handleEvents(code: number, data: any): void {
    switch (code) {
      case ConnEnums.events.RemainingFreeSpins    : { this.remainingFreespins(data);  break; }
      case ConnEnums.events.BalanceUpdated        : { this.updateBalance(data);       break; }
      case ConnEnums.events.FreeSpinTypes         : { this.freeSpinTypes(data);       break; }
      // case ConnEnums.events.MatchDeleteEvent      : { this.deleteTable(data);         break; }
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

  public remainingFreespins(data: any): void {
    this.data.game.freeSpins.count = data.FreespinsCount;
    this.data.game.freeSpins.bet = data.BetAmmount / this.data.ammountDivide;
    this.data.game.freeSpins.typeID = data.FrespinTypeID;

    if (this.data.game.freeSpins.showPopup == true || data.FreespinsCount == 0) {
      let freesPinType = this.data.freespinTypes.filter( (frsp:any) => frsp.typeID ==data.FrespinTypeID)[0];
      if(data.FreespinsCount == 0) {
        setTimeout(() => {
          this.data.modal.currentModal = 'bonus_win';
          let modal = this.data.modal.modalParams[this.data.modal.currentModal];
          modal.ammount = data.WonAmount / this.data.ammountDivide;
        }, 4000);
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
      }
      this.data.game.freeSpins.showPopup = false;
    }

  }

  public freeSpinTypes(data: any): void {
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
    this.data.user.balance = data.Balance / this.data.ammountDivide;
  }
}
