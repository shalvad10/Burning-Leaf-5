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
    ammountDivide: 10000,
    user: {
      userName: '',
      balance: 0
    },
    game: {
      initialMatrix: [],
      changedMatrix: [],
      specialSymbols: [],
      lines: [],
      freeSpins: {
        count: 0,
        bet: 0,
        typeID: 0
      },
      spinning: false,
      wonAmmount: 0,
      wonSymbolsCount: 0,
      gameLine: 5,
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
      { id: 1, type: 'BIG BONUS',   price: 150, leafs: 2,   freespinsCount: 10  },
      { id: 2, type: 'SUPER BONUS', price: 300, leafs: 2.5, freespinsCount: 10  },
      { id: 3, type: 'MEGA BONUS',  price: 720, leafs: 3,   freespinsCount: 10  }
    ]
  };
}
