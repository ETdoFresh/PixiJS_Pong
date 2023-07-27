import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class RenderRectangles extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Rectangle);
    }

    entityAdded(entity) {
        const rectangle = entity.getComponent(Components.Rectangle);
        if (!rectangle) return;
        rectangle.pixi = new PIXI.Graphics();
        rectangle.pixi.beginFill(rectangle.color || 0xFFFFFF);
        rectangle.pixi.drawRect(0, 0, 1, 1);
        rectangle.pixi.position.set(rectangle.x, rectangle.y);
        rectangle.pixi.width = rectangle.width;
        rectangle.pixi.height = rectangle.height;
        rectangle.pixi.endFill();
        this.container.addChild(rectangle.pixi);
    }

    entityRemoved(entity) {
        const rectangle = entity.getComponent(Components.Rectangle);
        if (!rectangle) return;
        this.container.removeChild(rectangle.pixi);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const rectangle = entity.getComponent(Components.Rectangle);
            if (!rectangle.pixi) continue;
            rectangle.pixi.position.set(rectangle.x, rectangle.y);
            rectangle.pixi.width = rectangle.width;
            rectangle.pixi.height = rectangle.height;
        }
    }
}
