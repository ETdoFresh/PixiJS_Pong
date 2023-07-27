import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class MovePaddleOnPlayer1Input extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Input, Components.Player1, Components.Paddle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const input = entity.getComponent(Components.Input);
            const paddle = entity.getComponent(Components.Paddle);
            if (input.keys['w']) {
                paddle.velocity.y = -paddle.speed;
            } else if (input.keys['s']) {
                paddle.velocity.y = paddle.speed;
            } else {
                paddle.velocity.y = 0;
            }
        }
    }
}

export class MovePaddleOnPlayer2Input extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Input, Components.Player2, Components.Paddle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const input = entity.getComponent(Components.Input);
            const paddle = entity.getComponent(Components.Paddle);
            if (input.keys['ArrowUp']) {
                paddle.velocity.y = -paddle.speed;
            } else if (input.keys['ArrowDown']) {
                paddle.velocity.y = paddle.speed;
            } else {
                paddle.velocity.y = 0;
            }
        }
    }
}