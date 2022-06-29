import { AppData   } from './Data/AppData';
import { URLReader } from './Libs/URLReader';
import { AppConnection } from './Connection/AppConnection';
import Actions from './Actions/Actions';
import * as isMobile from './Libs/isMobile.min.js';
import { Helpers } from './Libs/Helpers';

export class AppMain {
  public data         : AppData;
  public params       : URLReader;
  public conn!        : AppConnection;
  public actions!     : Actions;

  public managerLoaded: boolean = false;
  public configsLoaded: boolean = false;

  constructor() {
    this.data   = new AppData();
    this.params = new URLReader();

    console.log("IS MOBILE",isMobile);

    window.addEventListener('resize', this.resize.bind(this));
    Helpers.ajaxLoad(`./assets/slot-config.json`, (e: any) => {
      this.data.base.data.game.infoObject = e.info;
      // this.data.setBaseData(e);
      // this.data.setSettingsData(e);
    this.data.setProperties(this.params.getParams());
      this.conn    = new AppConnection(this.data.dataObject, isMobile);
      if (this.mobile.any) {
        
        var targetelement: any = document.getElementsByTagName('body')[0];
      
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          if (targetelement.requestFullscreen)
          {
            targetelement.requestFullscreen();
          }
          if (targetelement.webkitRequestFullscreen)
          {
            targetelement.webkitRequestFullscreen();
          }
          if (targetelement.mozRequestFullScreen)
          {
            targetelement.mozRequestFullScreen();
          }
          if (targetelement.msRequestFullscreen)
          {
            targetelement.msRequestFullscreen();
          }
        }
      }
      this.actions = new Actions(this.data.dataObject, this.conn.senderObject);
      // this.configsLoaded = true;
      // this.checkLoaded();
      // this.resize();
    });
  }

  public checkLoaded(): void {
    this.data.dataObject.lobbyLoaded = true;
    if(this.managerLoaded == true && this.configsLoaded == true)
    {
      this.data.dataObject.lobbyLoaded = ( this.managerLoaded === true && this.configsLoaded === true );
    }
  }

  public resize(): void {
    this.data.dataObject.availableSize = {x: window.innerWidth, y: window.innerHeight};
    this.data.dataObject.isMobile      = this.mobile.any == true || this.data.dataObject.availableSize.x <= 1100 ? true : false;
    this.data.dataObject.isDevice      = this.mobile.any == true;
  }

  public doAction(obj: any): void {
    this.actions.onAction(obj.action, obj.data);
  }

  public get mobile(): any {
    return isMobile;
  }

  public get dataObject(): any {
    return this.data.dataObject;
  }
}
