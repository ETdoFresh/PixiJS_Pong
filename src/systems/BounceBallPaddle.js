import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class BounceBallPaddle extends System {
    get queryEntities() {
        var balls =  this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
        var paddles = this.app.queryManager.getEntities(Components.Paddle, Components.Rectangle);
        
        var tuples = [];
        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < paddles.length; j++) {
                tuples.push([balls[i], paddles[j]]);
            }
        }
        return tuples;
    }

    loop(delta) {
        const tuples = this.queryEntities;
        for (let i = 0; i < tuples.length; i++) {
            const tuple = tuples[i];
            const ballEntity = tuple[0];
            const paddleEntity = tuple[1];
            const ball = ballEntity.getComponent(Components.Ball);
            const ballRectangle = ballEntity.getComponent(Components.Rectangle);
            const paddle = paddleEntity.getComponent(Components.Paddle);
            const paddleRectangle = paddleEntity.getComponent(Components.Rectangle);
            if (ballRectangle.x > paddleRectangle.x + paddleRectangle.width) continue;
            if (ballRectangle.x + ballRectangle.width < paddleRectangle.x) continue;
            if (ballRectangle.y > paddleRectangle.y + paddleRectangle.height) continue;
            if (ballRectangle.y + ballRectangle.height < paddleRectangle.y) continue;
            if (ball.velocity.x > 0) {
                ballRectangle.x = paddleRectangle.x - ballRectangle.width;
            }
            if (ball.velocity.x < 0) {
                ballRectangle.x = paddleRectangle.x + paddleRectangle.width;
            }
            ball.velocity.x *= -1;
            ball.velocity.y += paddle.velocity.y * 0.5;
            if (ball.velocity.y > ball.speed) {
                ball.velocity.y = ball.speed;
            }
            if (ball.velocity.y < -ball.speed) {
                ball.velocity.y = -ball.speed;
            }
        }
    }
}