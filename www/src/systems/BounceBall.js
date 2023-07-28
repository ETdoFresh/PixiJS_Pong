import { System } from './System.js';
import { Components } from '../components/Components.js';

export class BounceBallScreenTop extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.y < 0) {
                rectangle.y = 0;
                ball.velocity.y *= -1;
                PIXI.sound.play("pong-wall");
            }
        }
    }
}

export class BounceBallScreenBottom extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.y + rectangle.height > this.app.view.height) {
                rectangle.y = this.app.view.height - rectangle.height;
                ball.velocity.y *= -1;
                PIXI.sound.play("pong-wall");
            }
        }
    }
}

export class BounceBallScreenLeft extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.x < 0) {
                rectangle.x = 0;
                ball.velocity.x *= -1;
                PIXI.sound.play("pong-wall");
            }
        }
    }
}

export class BounceBallScreenRight extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.x + rectangle.width > this.app.view.width) {
                rectangle.x = this.app.view.width - rectangle.width;
                ball.velocity.x *= -1;
                PIXI.sound.play("pong-wall");
            }
        }
    }
}