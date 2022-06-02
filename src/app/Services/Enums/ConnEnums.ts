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
    BalanceUpdated : 0,
    RemainingFreeSpins : 10
  },
  eventParams: {
    Balance: 0,
    PlayerName: 1,
    PlayerId: 2,
    StakeAmount: 3,
    WinnedAmount: 4,
    TableId: 5,
    GameId: 6,
    AccountId: 7,
    DeviceTypeId: 8,
    SessionId: 9,

    FreespinsCount: 10,
    BetAmmount: 20,
    FrespinTypeID: 30
  },
  errorCodes: {
    NoError: 0,
    Denied: -1,
    NotFound: -2,
    InsufficientFunds: -3,
    Exception: -1000
  },
  Errors: {
    IncorrectBetScore: -101,
    IncorrectMatchType: -102,
    IncorrectTimeType: -103,
    IncorrectDoubleType: -104,
    IncorrectRule: -105,
    MatchDoesNotExists: -106,
    CannotAddMatch: -107,
    PlayerDoesNotExists: -108,
    CannotPlayWithYourSelf: -109,
    PlayerOnDisconnect: -110,
    PeerAlreadyCreatedMatch: -111,
    LobbyPeerAlreadyExists: -112,
    NotEndYet: -113,
    MatchIsNull: -201,
    NotYourTurn: -202,
    InvalidCards: -203,
    InvalidCardComeTry: -204,
    NothingToBeat: -205,
    NumberOfCardsIncorrect: -206,
    DifferentRankCards: -207,
    CannotBeatCards: -208,
    InvalidAction: -209
  }
};
