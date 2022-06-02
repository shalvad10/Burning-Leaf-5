import Reel from "./Reel";
import Symbol from "./Symbol";

export default class Slot {
    public domElement       : any;
    public currentSymbols   : [string[],string[],string[],string[],string[]];
    public nextSymbols      : [string[],string[],string[],string[],string[]];
    public container        : any;
    public reels            : Reel[];
    public spinButton       : any;
    public autoPlayCheckbox : any;
    public config           : any;

  constructor(domElement: any, config: any = {}) {
    Symbol.preload();

    this.currentSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()]
    ];

    this.nextSymbols = [
      ["wintry", "seven", "seven"],
      ["wintry", "wintry", "wintry"],
      ["wintry", "wild", "wintry"],
      ["wintry", "star", "star"],
      ["wintry", "star", "star"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
      new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    // this.spinButton = document.getElementById("spin");
    // if ( this.spinButton) {
    //   this.spinButton.addEventListener("click", () => this.spin());
    // }

    // this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin(customSymbols: any) {
    console.error(customSymbols)
    // this.nextSymbols = [
    //   [Symbol.random(), Symbol.random(), Symbol.random()],
    //   [Symbol.random(), Symbol.random(), Symbol.random()],
    //   [Symbol.random(), Symbol.random(), Symbol.random()],
    //   [Symbol.random(), Symbol.random(), Symbol.random()],
    //   [Symbol.random(), Symbol.random(), Symbol.random()],
    // ];
    
    this.nextSymbols = customSymbols;

    this.onSpinStart(customSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        console.error(reel.index, customSymbols[reel.index]);
        reel.renderSymbols(customSymbols[reel.index]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(customSymbols));
  }

  onSpinStart(symbols: any) {
    // this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols: any): number | void {
    this.currentSymbols = this.nextSymbols;
    console.warn('spin ENDED');
    // this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    // if (this.autoPlayCheckbox) {
    //   if (this.autoPlayCheckbox == true) {
    //     return window.setTimeout(() => this.spin(), 200);
    //   }
    // }
  }
}
