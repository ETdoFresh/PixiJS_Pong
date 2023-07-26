import { BunnyLevel } from "../levels/BunnyLevel.js";
import { FlowerLevel } from "../levels/FlowerLevel.js";
import { Holy } from "../levels/Holy.js";

export class Pack {
  constructor(app) {
    this.app = app;
    this.loader = new PIXI.Loader();
    this.allLevels = [new BunnyLevel(), new FlowerLevel()];
  }

  afterLoad() {
    this.bunnyTex = this.loader.resources.bunny.texture;
    this.flowerTex = this.loader.resources.flowerTop.texture;
  }

  start() {
    const { app } = this;
    const { game } = app;
    game.initLevel(new Holy());

    const options = {
      crossOrigin: "*"
    };
    //Cross-Origin Ritual Sacrifice

    this.loader
      .add(
        "bunny",
        "https://pixijs.io/examples/examples/assets/bunny.png",
        options
      )
      .add(
        "flowerTop",
        "https://pixijs.io/examples/examples/assets/flowerTop.png",
        options
      )
      .load(() => {
        setTimeout(() => {
          this.afterLoad();
          this.app.menu.afterLoad();
          game.initLevel(this.allLevels[0]);
        }, 2000);
      });
  }
}
