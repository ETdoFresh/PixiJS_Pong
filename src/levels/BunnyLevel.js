import { Entity } from "../Entity.js";
import { Level } from "./Level.js";

export class BunnyLevel extends Level {
  constructor(json) {
    super(json);
  }

  init(app) {
    const { game } = app;
    this.phase = 0;

    const { width, height } = app.view;

    for (let i = 0; i < 100; i++) {
      const v = Math.random() * 4 + 3;
      const ang = Math.random() * Math.PI * 2;
      const bunny = new Entity({
        x: width * Math.random(),
        y: height * Math.random(),
        size: 2,
        spriteTex: app.pack.bunnyTex,
        dummy: { v: v, ang: ang }
      });
      game.add(bunny);
    }

    // bunny.script = () => {
    //   this.phase += 0.01;
    //   bunny.rotation = this.phase;
    // };
  }
}
