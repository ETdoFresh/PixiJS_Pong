import * as PIXI from "/src/pixi.mjs";

const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
  lineJoin: "round"
});

export class Menu {
  constructor(app) {
    this.app = app;
    this.ui = new PIXI.Container();
    this.app.root.addChild(this.ui);
  }

  start() {
    const { allLevels } = this.app.pack;

    for (let i = 0; i < allLevels.length; i++) {
      const btn = new PIXI.Text(`Level ${i + 1}`, style);
      btn.y = 630;
      btn.x = ((i + 1) / (allLevels.length + 2)) * 1280;
      this.app.root.addChild(btn);

      btn.eventMode = 'static';
      btn.on('pointerdown', () => {
        this.app.game.initLevel(allLevels[i]);
      });
    }
  }
}
