import {Howl, Howler} from 'howler';

export class Sounds {
  ///////////// Instance Creation Starts Here

  private static _instance: Sounds;
  private _rootDirectory = './assets/sounds/';

  public constructor() {
    this.loadSounds();
    this.volume = this._volume;
  }

  public static get instance(): Sounds {
    if (this._instance === undefined) {
      this._instance = new Sounds();
    }
    return this._instance;
  }

  ///////////// Instance Creation Ends Here

  private sounds: any           = {};
  private _volume: number       = 1;
  private _spriteVolume: number = 1;

  public loadSounds() {
    this.sounds['start_spin'      ] = new Howl({src: [this._rootDirectory + 'start_spin.wav']});
    this.sounds['scatter'         ] = new Howl({src: [this._rootDirectory + 'scatter_symbol.wav']});
    this.sounds['leaf'            ] = new Howl({src: [this._rootDirectory + 'bonus-symbol-leaf.wav']});
    this.sounds['win'             ] = new Howl({src: [this._rootDirectory + 'win_sound.wav']});
    this.sounds['bonus_started'   ] = new Howl({src: [this._rootDirectory + 'free_spin_start.wav']});
    this.sounds['bonus_finished'  ] = new Howl({src: [this._rootDirectory + 'free_spin_end.wav']});

    console.log(this.sounds);
  }

  public loadSound(type:string,cb: any) {
    if(type && type.length>0) {
      let dir   = this._rootDirectory+type+"/";
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let data = this.parseSoundSprite(JSON.parse(xhttp.responseText).data.audioSprite as Array<object>);
            
            let snd  = new Howl({ src: [dir+'audio.mp3',dir+'audio.webm',dir+'audio.wav',dir+'audio.ogg'], sprite:data });
            this.sounds['sound_sprite'] = snd;

            if(cb) {
              cb();
            }
        }
      };
      xhttp.open("GET", dir+"audio.json", true);
      xhttp.send();
    } else if(cb) {
      cb();
    }
  }

  private parseSoundSprite(arr:Array<any>):any {
    
    let obj: any = {};
    for(var num = 0; num < arr.length; num++) {
      obj[arr[num]['id']] = [arr[num]['startTime'],arr[num]['duration']]; 
    }
    return obj;
  }

  public play(snd1: any,interval: any = undefined):Boolean {
    if (this.sounds[snd1]) {
      if (this.sounds[snd1].playing() === true) {
        this.sounds[snd1].stop();
      }
      this.sounds[snd1].play();
      if (interval) {
        setTimeout(() => {
          this.sounds[snd1].stop();
        }, interval);
      }
      return true;
    }
    // if (this.sounds['sound_sprite']) {
    //   if(this.sounds['sound_sprite']._sprite[snd1] && snd1 !== undefined) {
    //     this.sounds['sound_sprite'].play(snd1);
    //     return true;
    //   }
    //   if(this.sounds['sound_sprite']._sprite[snd2] && snd2 !== undefined) {
    //     this.sounds['sound_sprite'].play(snd2);
    //     return true;
    //   }
    // }
    return false;
  }

  public stop(snd: any) {
    if (this.sounds[snd]) {
      this.sounds[snd].stop();
    }
  }

  public get volume() {
    return this._volume;
  }

  public set volume(vol: number) {
    vol = vol>1 ? 1 : vol;
    this._volume = vol;
    for (const key in this.sounds) {
      if(key != 'sound_sprite') {
        this.sounds[key].volume(vol);
      }
    }
  }

  public get spriteVolume() {
    return this._spriteVolume;
  }

  public set spriteVolume(vol: number) {
    vol = vol>1 ? 1 : vol;
    this._spriteVolume = vol;

    if(this.sounds['sound_sprite']) {
      this.sounds['sound_sprite'].volume(vol);
    }
  }
}
