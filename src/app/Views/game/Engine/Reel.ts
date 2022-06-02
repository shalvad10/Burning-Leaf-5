import Symbol from "./Symbol";

export default class Reel {
    public reelContainer: any;
    public symbolContainer: any;
    public index: number;
    public animation: any

  constructor(reelContainer: any, index: number, initialSymbols: any) {
    this.reelContainer = reelContainer;
    this.index = index;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    this.animation = this.symbolContainer.animate(
      [
        { transform: "none", filter: "blur(0)" },
        { filter: "blur(10px)", offset: 0.1 },
        {
          transform: `translateY(${  ((Math.floor(this.factor) * 10) / (3 + Math.floor(this.factor) * 10)) * 100 }%)`,
          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 1200,
        easing: "ease-in-out",
      }
    );
    this.animation.cancel();

    initialSymbols.forEach((symbol: any) =>
      this.symbolContainer.prepend(new Symbol(symbol).img)
    );
  }

  get factor() {
    return 1 + Math.pow(this.index / 2, 2);
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
      setTimeout(resolve, this.factor * 500)
    );

    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      const max = this.symbolContainer.children.length - 3;

      for (let i = 0; i < max; i++) {
        this.symbolContainer.firstChild.remove();
      }
    });
  }
}
