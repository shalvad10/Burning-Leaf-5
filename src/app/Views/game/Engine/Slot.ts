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
    public spinning         : boolean = false;

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

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin(customSymbols: any) {
    this.nextSymbols = customSymbols;

    this.onSpinStart(customSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(customSymbols[reel.index]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(customSymbols));
  }

  stop(customSymbols: any) {
    return Promise.all(
      this.reels.map((reel) => {
        return reel.stop();
      })
    ).then(() => this.onSpinEnd(customSymbols));
  }

  animateReel(reelIndex: number, symbolIndex: number): void {
    this.reels[reelIndex].animateSymbol(symbolIndex);
  }

  onSpinStart(symbols: any) {
    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols: any): number | void {
    this.currentSymbols = this.nextSymbols;
    this.config.onSpinEnd?.(symbols);
  }
}
