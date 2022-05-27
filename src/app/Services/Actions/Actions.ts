import { Sender } from './Sender';
import { Languages } from '../Libs/Languages';
import { ConnEnums } from '../Enums/ConnEnums';
import { AppEnums } from '../Enums/AppEnums';
import SharedMethods from './SharedMethods';
import { Styles } from '../Libs/Styles';

export default class Actions {
  
  constructor(public data: any, public sender: Sender) {}

  public onAction(type: string, data: any) {

    console.warn(type,data);

    switch (type) {
      case 'spin'         : { this.spin();                break; }
      // case 'toggleModal'            : { this.toggleModal(data);                   break; }
      // case 'changeState'            : { this.changeState(data);                   break; }
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

  public spin(): void {
    this.sender.spin();
  }

}
