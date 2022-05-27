import { ObjectParser } from './../Connection/ObjectParser';
import { ConnEnums    } from '../Enums/ConnEnums';
import { Sender } from '../Actions/Sender';
import SharedMethods from '../Actions/SharedMethods';
import { AppEnums } from 'src/app/Services/Enums/AppEnums';

export default abstract class BaseEventHandler {
  constructor(private data: any, private sender: Sender) { }

  public handleEvents(code: number, data: any): void {
    switch (code) {
      // case ConnEnums.events.MatchListUpdate       : { this.updateTables(data);        break; }
      // case ConnEnums.events.RakebackLevel         : { this.setRakebackLevel(data);    break; }
      case ConnEnums.events.BalanceUpdated        : { this.updateBalance(data);       break; }
      // case ConnEnums.events.MatchListOnJoinLobby  : { this.setTables(data);           break; }
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

  public updateBalance(data: any) {
    this.data.user.balance = data.Balance;
  }
}
