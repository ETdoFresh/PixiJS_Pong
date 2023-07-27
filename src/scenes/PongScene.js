import { Scene } from "./Scene.js";
import { Entity } from "../entities/Entity.js";
import { RenderRectangles } from "../systems/RenderRectangles.js";
import { RenderText } from "../systems/RenderText.js";
import { MoveBall } from "../systems/MoveBall.js";
import { BounceBallScreenTop, BounceBallScreenBottom, BounceBallScreenLeft, BounceBallScreenRight } from "../systems/BounceBall.js";
import { ScoreBallScreenLeft, ScoreBallScreenRight } from "../systems/ScoreBall.js";
import { BindScoreToText } from "../systems/BindScoreToText.js";
import { MovePaddleOnPlayer1Input, MovePaddleOnPlayer2Input } from "../systems/MovePaddleOnInput.js";
import { MovePaddle } from "../systems/MovePaddle.js";
import { LimitPaddleToScreen } from "../systems/LimitPaddleToScreen.js";
import { BounceBallPaddle } from "../systems/BounceBallPaddle.js";
import { WinGame } from "../systems/WinGame.js";

export class PongScene extends Scene {
  loadEntities() {
    super.loadEntities();
    let viewWidth = this.app.view.width;
    let viewHeight = this.app.view.height;
    this.addEntity(new Entity({
      Name: "Paddle1",
      Rectangle: { x: 20, y: viewHeight / 2 - 50, width: 10, height: 100 },
      Paddle: { speed: 10, velocity: { x: 0, y: 0 } },
      Player1: {},
      Input: { x: 0, y: 0 },
    }));
    this.addEntity(new Entity({
      Name: "Paddle2",
      Rectangle: { x: viewWidth - 20 - 10, y: viewHeight / 2 - 50, width: 10, height: 100 },
      Paddle: { speed: 10, velocity: { x: 0, y: 0 } },
      Player2: {},
      Input: { x: 0, y: 0 },
    }));
    this.addEntity(new Entity({
      Name: "Ball",
      Rectangle: { x: viewWidth / 2 - 5, y: viewHeight / 2 - 5, width: 10, height: 10 },
      Ball: { maxSpeed: 10, velocity: { x: 5, y: -5 } },
    }));
    this.addEntity(new Entity({
      Name: "Net",
      DashedLine: { x: 0, y: 0, width: 10, height: 10 },
    }));
    this.addEntity(new Entity({
      Name: "Score1",
      Text: { text: "0", style: { fill: 0xffffff }, x: viewWidth * 0.25, y: 50 },
      Score: { value: 0 },
      Player1: {},
    }));
    this.addEntity(new Entity({
      Name: "Score2",
      Text: { text: "0", style: { fill: 0xffffff }, x: viewWidth * 0.75, y: 50 },
      Score: { value: 0 },
      Player2: {},
    }));
  }

  loadSystems() {
    super.loadSystems();
    this.addSystem("renderRectangles", RenderRectangles);
    this.addSystem("renderText", RenderText);
    this.addSystem("moveBall", MoveBall);
    this.addSystem("bounceBallScreenTop", BounceBallScreenTop);
    this.addSystem("bounceBallScreenBottom", BounceBallScreenBottom);
    this.addSystem("scoreBallScreenLeft", ScoreBallScreenLeft);
    this.addSystem("scoreBallScreenRight", ScoreBallScreenRight);
    this.addSystem("bounceBallScreenLeft", BounceBallScreenLeft);
    this.addSystem("bounceBallScreenRight", BounceBallScreenRight);
    this.addSystem("bindScoreToText", BindScoreToText);
    this.addSystem("movePaddleOnPlayer1Input", MovePaddleOnPlayer1Input);
    this.addSystem("movePaddleOnPlayer2Input", MovePaddleOnPlayer2Input);
    this.addSystem("movePaddle", MovePaddle);
    this.addSystem("limitPaddleToScreen", LimitPaddleToScreen);
    this.addSystem("bounceBallPaddle", BounceBallPaddle);
    this.addSystem("winGame", WinGame);
  }
}
