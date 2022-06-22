import { Sounds } from "src/app/Services/Libs/sounds";
import Symbol from "./Symbol";

export default class Reel {
    public reelContainer    : any;
    public symbolContainer  : any;
    public index            : number;
    public animation        : any
    public symbolAnimation  : any;
    public borderAnimation  : any;

  constructor(reelContainer: any, index: number, initialSymbols: any) {
    this.reelContainer = reelContainer;
    this.index = index;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    this.animation = this.symbolContainer.animate(
      [
        { transform: "none", filter: "blur(0)" },
        { filter: "blur(50px)", offset: 0.1 },
        {
          transform: `translateY(${  ((Math.floor(this.factor) * 10) / (3 + Math.floor(this.factor) * 10)) * 100 }%)`,
          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 800,
        easing: "ease-in-out",
      }
    );
    this.animation.cancel();

    initialSymbols.forEach((symbol: any) =>
      this.symbolContainer.prepend(new Symbol(symbol).img)
    );
  }

  get factor() {
    return 1 + Math.pow(this.index / 2, 1);
  }

  animateBorders(symbolIndex: number, finish: boolean = false) {
    if (finish) {
      this.borderAnimation = this.symbolContainer.children[symbolIndex].cancel();
    } else {
      this.borderAnimation = this.symbolContainer.children[symbolIndex].animate(
        [
          { borderColor: "#FFF"},
          { borderColor: "transparent"},
          { borderColor: "#FFF"},
          { borderColor: "transparent"}
        ],
        {
          duration: 1000,
          easing: 'linear'
        }
      );
    }
  }

  animateSymbol(symbolIndex: number) {
    this.symbolAnimation = this.symbolContainer.children[symbolIndex].animate(
      [
        { transform: "none", filter: "blur(0)" },
        { filter: "blur(50px)", offset: 0.1 },
        { transform: "none", filter: "blur(0)" },
      ],
      {
        duration: 1000,
        easing: "ease-in-out",
      }
    );
    this.symbolAnimation.play();
    
    setTimeout(()=> {
      this.symbolAnimation.cancel();
    }, 700);
  }

  renderSymbols(nextSymbols: string[]) {
    const fragment = document.createDocumentFragment();

    for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
      const icon = new Symbol(
        i >= 10 * Math.floor(this.factor) - 2
          ? nextSymbols[i - Math.floor(this.factor) * 10]
          : undefined
      );
      fragment.appendChild(icon.img);
    }
    this.symbolContainer.appendChild(fragment);
  }

  spin() {
      
    const animationPromise = new Promise(
      (resolve) => (this.animation.onfinish = resolve)
    );
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, this.factor * 600)
    );

    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      const max = this.symbolContainer.children.length - 3;

      for (let i = 0; i < max; i++) {
        this.symbolContainer.firstChild.remove();
      }
      
      let counter = 0;
      let isScatter = false;
      let isLeaf = false;
      for (const key in this.symbolContainer.children) {
        if (Object.prototype.hasOwnProperty.call(this.symbolContainer.children, key)) {
          const element = this.symbolContainer.children[key];
          const srcArr = element.src.split('/');
          const elementSRC = srcArr[srcArr.length-1].split('.')[0];
          counter++;
          if (elementSRC == 'dollar' || elementSRC == 'star') {
            isScatter = true;
          }
          if (elementSRC == 'leaf') {
            isLeaf = true;
          }
          if (counter == 2) {
            if (isScatter) {
              Sounds.instance.play('scatter');
            } if (isLeaf) {
              Sounds.instance.play('leaf');
            } else {
              Sounds.instance.play('start_spin');
            }
            counter = 0;
          }
        }
      }
    });
  }

  animateBorder(index: any) {
    this.animateBorders(index);
    const animationPromise = new Promise(
      (resolve) => (this.borderAnimation.onfinish = resolve)
    );
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    this.borderAnimation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.borderAnimation.playState != "finished") this.borderAnimation.finish();
    });
  }

  cancelBorderAnimation(index: any) {
    this.animateBorders(index,true);
    const animationPromise = new Promise(
      (resolve) => (this.borderAnimation.onfinish = resolve)
    );
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    this.borderAnimation.finish();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.borderAnimation.playState != "finished") this.borderAnimation.finish();
    });
  }
  
  stop() {
    if (this.animation.playState !== "finished") {
      this.animation.finish();
    }
  }
}
