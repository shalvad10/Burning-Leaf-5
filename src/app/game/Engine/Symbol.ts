const cache: any = {};

export default class Symbol {
    public name: string;
    public img: any;

    constructor(name = Symbol.random()) {
        this.name = name;

        if (cache[name]) {
            this.img = cache[name].cloneNode();
        } else {
            this.img = new Image();
            this.img.src = `../../../assets/symbols/${name}.svg`;
            this.img.style = "width: 100%; height: 100%;"
        
            cache[name] = this.img;
        }
    }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "7",
      "bell",
      "cherry",
      "dollar",
      "grape",
      "lemon",
      "orange",
      "plum",
      "star",
      "watermelon",
      "wild"
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
