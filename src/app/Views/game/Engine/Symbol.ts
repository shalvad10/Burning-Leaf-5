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
            this.img.src = `/assets/symbols/${name}.svg`;
            this.img.style = "width: calc(100% - 4px); height: calc(100% - 4px);border: 2px solid transparent"
        
            cache[name] = this.img;
        }
    }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "leaf",
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
      "wintry",
      "grape",
      "seven",
      "dollar",
      "star"
    ];
  }

  static random() {
    let symbols = [
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
      "wintry",
      "grape",
      "seven",
      "dollar",
      "star"
    ];
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  static getByID(id: number) {
    return id == 200 ? this.symbols[this.symbols.length-1] : ( id === 100 ? this.symbols[this.symbols.length-2] : this.symbols[id] );
  }
}
