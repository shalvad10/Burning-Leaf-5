import BaseEventHandler from '../Base/BaseEventHandler';
import { Sender } from './Sender';

export class EventHandler extends BaseEventHandler {

  constructor(data: any, sender: Sender) {
    super(data, sender);
  }

  public override handleEvents(code: number, data: any): void {
    super.handleEvents(code, data);
  }

}
