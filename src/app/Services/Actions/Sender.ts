import { AppConnection } from '../Connection/AppConnection';
import BaseSender from './BaseSender';

export class Sender extends BaseSender {

  constructor( conn: AppConnection) {
    super(conn);
  }

}
