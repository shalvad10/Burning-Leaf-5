import BaseResponseHandler from '../Base/BaseResponseHandler';
import { Sender } from './Sender';

export class ResponseHandler extends BaseResponseHandler {

  constructor(data: any, sender: Sender) {
    super(data, sender);
  }

  public override handleResponses(code: number, data: any): void {
    super.handleResponses(code, data);
  }

}
