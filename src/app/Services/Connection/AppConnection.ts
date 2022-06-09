import * as Connection from '../libs/connection.min';
import { ConnEnums } from '../Enums/ConnEnums';
import { ObjectParser } from './ObjectParser';
import { Sender } from '../Actions/Sender';
import { EventHandler } from '../Actions/EventHandler';
import { ResponseHandler } from '../Actions/ResponseHandler';
import { environment } from './../../../environments/environment';

export class AppConnection {
  public conn: any;
  public eventHandler: EventHandler;
  public responseHandler: ResponseHandler;
  public sender: Sender;

  constructor(public data: any,public isMobile:any) {
    this.sender          = new Sender(this);
    this.eventHandler    = new EventHandler(this.data, this.sender);
    this.responseHandler = new ResponseHandler(this.data, this.sender);

    this.conn            = new Connection(environment.connectionURL, ConnEnums, true);
    this.conn.onResponse = this.onResponse.bind(this);
    this.conn.onEvent    = this.onEvent.bind(this);

    this.conn.onConnected    = this.responseHandler.onConnected.bind(this);
    this.conn.onDisconnected = this.responseHandler.onDisconnected.bind(this);
  }

  public sendObject(operationId: number, obj: Object) {
    this.conn.sendObject(operationId, obj);
  }

  public onEvent(code: number, data: any): void {
    data.vals = ObjectParser.updateEventObjectAmounts(data.vals);
    this.eventHandler.handleEvents(code, data.vals);
  }

  public onResponse(code: any, data: any) {
    data.vals = ObjectParser.updateResponseObjectAmounts(data.vals);

    if (data.errCode !== ConnEnums.errorCodes.NoError) {
      this.responseHandler.onError(data.errCode, data.errCodeKey, data.errMsg);
      return;
    }
    this.responseHandler.handleResponses(code, data.vals);
  }

  public get senderObject(): any {
    return this.sender;
  }
}
