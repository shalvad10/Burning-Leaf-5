export class SettingsData
{
  public data: any =
  {
    settings:
    {
      handDouble:
      [
        { name: 'double_1', value: 1},
        { name: 'double_2', value: 2},
        { name: 'double_3', value: 3},
        { name: 'double_4', value: 4},
        { name: 'double_5', value: 5},
        { name: 'double_6', value: 6}
      ],
      internationalDouble:
      [
        { name: 'double_1', value: 1},
        { name: 'x2',   value: 2},
        { name: 'x4',   value: 4},
        { name: 'x8',   value: 8},
        { name: 'x16',  value: 16},
        { name: 'x32',  value: 32},
        { name: 'x64',  value: 64}
      ],
      gameType:
      [
        { name: '3_cards', value: 1},
        { name: '5_cards', value: 2}
      ],
      dominoGameType: [
        { name: 1 , value: 1},
        { name: 2 , value: 2},
        { name: 3 , value: 3},
        { name: 4 , value: 4},
        { name: 5 , value: 5},
        { name: 6 , value: 6},
        { name: 7 , value: 7}
      ],
      backgammonGameType:
      [
        { name: 'oneHand', value: 1},
        { name: 'multipleHands', value: 2}
      ],
      backgammonGameVariations:
      [
        { name: 'georgian',      value: 1},
        { name: 'international', value: 2},
        { name: 'long',          value: 3}
      ],
      score:
      [
        { name: 1, value: 1 },
        { name: 3, value: 3 },
        { name: 5, value: 5 },
        { name: 7, value: 7 },
        { name: 9, value: 9 },
        { name: 11, value: 11 }
      ],
      domino_score:
      [
        { name: 75,   value: 1 },
        { name: 175,  value: 2 },
        { name: 255,  value: 3 },
        { name: 355,  value: 4 },
      ],
      backgammon_score:
      [
        { name: 1, value: 1 },
        { name: 2, value: 2 },
        { name: 3, value: 3 },
        { name: 4, value: 4 },
        { name: 5, value: 5 },
        { name: 6, value: 6 },
        { name: 7, value: 7 },
        { name: 8, value: 8 },
        { name: 9, value: 9 },
        { name: 10, value: 10 },
        { name: 11, value: 11 }
      ],
      time:
      [
        { name: 'normal', value: 1 },
        { name: 'blitz' , value: 2 }
      ],
      figures: [],
      boards : []
    },
    rules: [],
    playerSettings:
    {
      MatchConditionsArray: [],
      MatchType: 0,
      MatchTimeType: 0,
      MatchMinBet: 0,
      MatchMaxBet: 0,
      MatchScore: 0,
      AvatarId: 0,
      BackgroundType: 0,
      CardType: 0,
      SoundLevel: 0
    }
  };
}
