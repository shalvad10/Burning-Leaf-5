import { AppEnums } from './../Enums/AppEnums';

export class BaseData {
  public data: any = {
    connection: {
      connectionURL: 'wss://test-bura.europebet.com:12010',
      connected: false,
      partnerID: 1,
      accountID: 0,
      deviceType: AppEnums.DeviceType.Desktop,
      sessionKey: undefined
    },
    loading: true,
    ammountDivide: 10000,
    user: {
      userName: '',
      balance: 0,
      holdBalance: false,
      balanceTohold: 0,
      currency: 'GEL'
    },
    game: {
      gameLoaded: false,
      initialMatrix: [],
      changedMatrix: [],
      specialSymbols: [],
      lines: [],
      winningInfo: undefined,
      freeSpins: {
        count: -1,
        bet: 0,
        typeID: 0,
        showPopup: true
      },
      autoSpin: {
        inProgress: false,
        spinsRemaining: 0,
        infiniteLoop: false
      },
      showWin: false,
      stopBTNCount: 0,
      spinning: false,
      cancelAnimations: false,
      wonAmmount: 0,
      wonSymbolsCount: 0,
      gameLine: 5,
      bonusLeafLines: [],
      nominales: [0.03,0.10,0.40,1,2,5],
      selectedNominale: 0.03,
      betMultipliers: [1,2,5,10,20],
      selectedMultiplierIndex: 0,
      selectedBet: 0.15
    },
    winByLines: {
      line1: [ [1,0],[1,1],[1,2],[1,3],[1,4] ],
      line2: [ [0,0],[0,1],[0,2],[0,3],[0,4] ],
      line3: [ [2,0],[2,1],[2,2],[2,3],[2,4] ],
      line4: [ [0,0],[1,1],[2,2],[1,3],[0,4] ],
      line5: [ [2,0],[1,1],[0,2],[1,3],[2,4] ],
    },
    freespinTypes: [
    ],
    selectedFreespinID: 0
  };
}
