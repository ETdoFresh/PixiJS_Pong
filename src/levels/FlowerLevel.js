import * as PIXI from "/src/pixi.mjs";
import { Level } from "./Level.js";

export class FlowerLevel extends Level {
  constructor(json) {
    super(json);
  }

  init(app) {
    const { game } = app;
    this.phase = 0;

    const { width, height } = app.view;
    this.sprite = new PIXI.Sprite(app.pack.flowerTex);
    this.sprite.position.set(width / 2, height / 2);
    this.sprite.anchor.set(0.5, 0.5);
    game.world.addChild(this.sprite);

    game.ticker.add(() => {
      this.phase += 0.01;
      this.sprite.rotation = this.phase;
    });
  }
}
