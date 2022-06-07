export const ConnEnums = {
  operations: {
    Login : 0,
    Spin : 10,
    FreeSpin: 11,
    BuyFreeSpin : 14
  },
  operationParams: {
    PlayerName : 0,
    SessionId : 1,
    Balance : 2,
    GameId : 3,

    Number : 10,
    String : 11,
    Boolean : 12,
    Array : 13,
    Dictionary: 14,

    BetAmount : 20,
    WonAmount : 21,
    NumberOfLines : 22,
    LineId : 23,
    SymbolId : 24,
    Multiplier : 25,

    InitialMatrix : 30,
    FinalMatrix : 31,
    Scatters : 32,
    Lines : 33,
    FreeSpinTypeId: 34
  },
  events: {
    BalanceUpdated      : 0,
    ChipNominals        : 1,
    Lines               : 2,
    FreeSpinTypes       : 3,
    RemainingFreeSpins  : 10,
    BonusLeafLines      : 11
  },
  eventParams: {
    Balance         : 0,
    PlayerName      : 1,
    PlayerId        : 2,
    StakeAmount     : 3,
    WinnedAmount    : 4,
    TableId         : 5,
    GameId          : 6,
    AccountId       : 7,
    DeviceTypeId    : 8,
    SessionId       : 9,
    FreespinsCount  : 10,
    Array           : 13,
    BetAmmount      : 20,
    WonAmount       : 21,
    Rate            : 22,
    Minimum         : 23,
    Maximum         : 24,
    FrespinTypeID   : 30
  },
  errorCodes: {
    NoError: 0,
    Denied: -1,
    NotFound: -2,
    InsufficientFunds: -3,
    PlayerNotFound: -4,
    PlayerExists: -100,
    Exception: -1000
  },
  Errors: {
    PlayerNotFound: -4
  }
};
