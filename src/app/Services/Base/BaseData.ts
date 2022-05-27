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
    user: {
      userName: '',
      balance: 0
    },
    game: {
      initialMatrix: [],
      changedMatrix: []
    }
  };
}
