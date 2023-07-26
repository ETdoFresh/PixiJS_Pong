import * as PIXI from "/src/pixi.mjs";
import { BunnyLevel } from "../levels/BunnyLevel.js";
import { FlowerLevel } from "../levels/FlowerLevel.js";
import { Holy } from "../levels/Holy.js";

export class Pack {
  constructor(app) {
    this.app = app;
    this.allLevels = [new BunnyLevel(), new FlowerLevel()];
  }

  async start() {
    const { app } = this;
    const { game } = app;
    game.initLevel(new Holy());

    const options = {
      crossOrigin: "*"
    };
    //Cross-Origin Ritual Sacrifice

    this.bunnyTex = await PIXI.Assets.load("https://pixijs.io/examples/examples/assets/bunny.png")
    this.flowerTex = await PIXI.Assets.load("https://pixijs.io/examples/examples/assets/flowerTop.png")
  }
}
