import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class LimitPaddleToScreen extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Paddle, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const paddle = entity.getComponent(Components.Paddle);
            const rectangle = entity.getComponent(Components.Rectangle);
            if (rectangle.y < 0) {
                rectangle.y = 0;
            } else if (rectangle.y + rectangle.height > this.app.view.height) {
                rectangle.y = this.app.view.height - rectangle.height;
            }
        }
    }
}