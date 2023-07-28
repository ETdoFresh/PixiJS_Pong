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
            const isKeyboardUpPressed = input.keys['w'];
            const isKeyboardDownPressed = input.keys['s'];
            const isPointerUpPressed = input.quadrant.pointerDown && input.quadrant.x === -1 && input.quadrant.y === -1;
            const isPointerDownPressed = input.quadrant.pointerDown && input.quadrant.x === -1 && input.quadrant.y === 1;
            if (isKeyboardUpPressed || isPointerUpPressed) {
                paddle.velocity.y = -paddle.speed;
            } else if (isKeyboardDownPressed || isPointerDownPressed) {
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
            const isKeyboardUpPressed = input.keys['ArrowUp'];
            const isKeyboardDownPressed = input.keys['ArrowDown'];
            const isPointerUpPressed = input.quadrant.pointerDown && input.quadrant.x === 1 && input.quadrant.y === -1;
            const isPointerDownPressed = input.quadrant.pointerDown && input.quadrant.x === 1 && input.quadrant.y === 1;
            if (isKeyboardUpPressed || isPointerUpPressed) {
                paddle.velocity.y = -paddle.speed;
            } else if (isKeyboardDownPressed || isPointerDownPressed) {
                paddle.velocity.y = paddle.speed;
            } else {
                paddle.velocity.y = 0;
            }
        }
    }
}