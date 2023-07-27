import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class ScoreBallScreenLeft extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        const score2Entity = this.app.queryManager.getEntity(Components.Score, Components.Player2)
        const score2Component = score2Entity.getComponent(Components.Score);
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.x < 0) {
                rectangle.x = this.app.view.width / 2 - rectangle.width / 2;
                rectangle.y = this.app.view.height / 2 - rectangle.height / 2;
                ball.velocity.x = 5;
                score2Component.score += 1;
            }
        }
    }
}

export class ScoreBallScreenRight extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        const score1Entity = this.app.queryManager.getEntity(Components.Score, Components.Player1)
        const score1Component = score1Entity.getComponent(Components.Score);
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.x + rectangle.width > this.app.view.width) {
                rectangle.x = this.app.view.width / 2 - rectangle.width / 2;
                rectangle.y = this.app.view.height / 2 - rectangle.height / 2;
                ball.velocity.x = -5;
                score1Component.score += 1;
            }
        }
    }
}