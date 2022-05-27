import { AppConnection } from '../Connection/AppConnection';
import { ConnEnums } from '../Enums/ConnEnums';

export default class BaseSender {
  constructor(public conn: AppConnection) {
  }

  public enableReconnect(enable:boolean) {
    this.conn['conn'].reconnectInterval = (enable == true) ? 3 : 0;
  }

  public login(): void {
    console.warn(this.conn)
    const obj: any = {};
    obj[ConnEnums.operationParams.SessionId] = this.conn.data.connection.sessionKey;
    obj[ConnEnums.operationParams.SlotId] = 1;

    this.conn.sendObject(ConnEnums.operations.Login, obj);
  }

  public spin(): void {
    const obj: any = {};
    obj[ConnEnums.operationParams.BetAmount] = 5;
    obj[ConnEnums.operationParams.NumberOfLines] = 20;

    this.conn.sendObject(ConnEnums.operations.Spin, obj);
  }
}
