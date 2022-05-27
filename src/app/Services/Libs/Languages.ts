export class Languages
{
    ///////////// Instance Creation Starts Here

    public static _instance: Languages;

    public constructor()
    {
        this._listeners = new Array<Function>();
    }

    public static get instance():Languages
    {
        if(this._instance === undefined)
        {
            this._instance = new Languages();
        }
        return this._instance;
    }

    ///////////// Instance Creation Ends Here

    public _selectedLanguage:string = "";
    public _data!           :any;
    public _listeners       :Array<any>;

    public getWord(key: any)
    {
        if(this._data)
        {
            if(this._data[this._selectedLanguage])
            {
                if(this._data[this._selectedLanguage][key])
                {
                    return this._data[this._selectedLanguage][key];
                }
            }
        }
        return key;
    }

    public loadLanguages(url: any,onLoaded: any = null)
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

    public selectLanguage(lang:string)
    {
        this._selectedLanguage = lang;
        this.emitChange();
    }

    public emitChange()
    {
      for(var num = 0; num < this._listeners.length; num++)
      {
        if(this._listeners[num])
        {
          if(this._listeners[num].onLanguageChange)
          {
            this._listeners[num].onLanguageChange();
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
        return this._selectedLanguage;
    }
}
