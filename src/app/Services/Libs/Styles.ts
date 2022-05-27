export class Styles
{
    ///////////// Instance Creation Starts Here

    public static _instance: Styles;

    public constructor()
    {
        this._listeners = new Array<Function>();
    }

    public static get instance():Styles
    {
        if(this._instance === undefined)
        {
            this._instance = new Styles();
        }
        return this._instance;
    }

    ///////////// Instance Creation Ends Here

    public _selectedStyle:string = "";
    public _lightMode    :boolean = false;
    public _data!        :any;
    public _listeners    :Array<any>;

    public getStyle(key: any)
    {
        if(this._data)
        {
          const mode = this._lightMode ? 'light' : 'dark';
            if(this._data[mode][this._selectedStyle])
            {
                if(this._data[mode][this._selectedStyle][key])
                {
                    return this._data[mode][this._selectedStyle][key];
                }
            }
        }
        return key;
    }

    public loadStyles(url: any,onLoaded: any = null)
    {
        var xhttp = new XMLHttpRequest();
        var scope = this;
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                scope._data = JSON.parse(this.responseText);
                if(onLoaded)
                {
                    onLoaded();
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    public selectStyle(style:string, light: boolean)
    {
        this._selectedStyle = style;
        this._lightMode = light;
        this.emitChange();
    }

    public emitChange()
    {
      for(var num = 0; num < this._listeners.length; num++)
      {
        if(this._listeners[num])
        {
          if(this._listeners[num].onStyleChange)
          {
            this._listeners[num].onStyleChange();
          }
        }
      }
    }

    public registerListener(obj:any)
    {
      if(this._listeners.indexOf(obj)<0)
      {
        this._listeners.push(obj);
      }
    }

    public unregisterListener(obj:any)
    {
      if(this._listeners.indexOf(obj)>=0)
      {
        this._listeners.splice(this._listeners.indexOf(obj),1);
      }
    }

    public get selected()
    {
        return this._selectedStyle;
    }

    public get selectedMode()
    {
        return this._lightMode;
    }
}
