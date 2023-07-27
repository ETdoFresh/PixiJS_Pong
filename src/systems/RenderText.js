import { System } from "./System.js";
import { Components } from "../components/Components.js";

export class RenderText extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Text);
    }

    entityAdded(entity) {
        const text = entity.getComponent(Components.Text);
        if (!text) return;
        text.pixi = new PIXI.Text(text.text, text.style);
        text.pixi.position.set(text.x, text.y);
        this.container.addChild(text.pixi);
    }

    entityRemoved(entity) {
        const text = entity.getComponent(Components.Text);
        if (!text) return;
        this.container.removeChild(text.pixi);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const text = entity.getComponent(Components.Text);
            if (!text.pixi) continue;
            text.pixi.text = text.text;
            text.pixi.position.set(text.x, text.y);
        }
    }
}
