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
    obj[ConnEnums.operationParams.GameId] = 3;

    this.conn.sendObject(ConnEnums.operations.Login, obj);
  }

  public spin(bet: number): void {
    const obj: any = {};
    obj[ConnEnums.operationParams.BetAmount] = bet;
    obj[ConnEnums.operationParams.NumberOfLines] = 5;

    this.conn.sendObject(ConnEnums.operations.Spin, obj);
  }

  public freeSpin(bet: number): void {
    const obj: any = {};
    obj[ConnEnums.operationParams.BetAmount] = bet;
    obj[ConnEnums.operationParams.NumberOfLines] = 5;

    this.conn.sendObject(ConnEnums.operations.FreeSpin, obj);
  }

  public buyFreeSpin(freespinType:number, bet: number): void {
    const obj: any = {};
    obj[ConnEnums.operationParams.FreeSpinTypeId] = freespinType;
    obj[ConnEnums.operationParams.BetAmount] = bet;
    obj[ConnEnums.operationParams.NumberOfLines] = 5;

    this.conn.sendObject(ConnEnums.operations.BuyFreeSpin, obj);
  }
}
