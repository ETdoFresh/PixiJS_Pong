export class RenderRectangles {
    constructor(app) {
        this.app = app;
    }

    get container() {
        return this.app.sceneManager.container;
    }

    get queryEntities() {
        //return this.app.queryManager.getEntities("Rectangle");
        var entities = [];
        for (let i = 0; i < this.app.sceneManager.scene.entities.length; i++) {
            const entity = this.app.sceneManager.scene.entities[i];
            if (entity.hasComponent("Rectangle")) {
                entities.push(entity);
            }
        }
        return entities;
    }

    entityAdded(entity) {
        if (!entity.hasComponent("Rectangle")) return;
        const rectangle = entity.getComponent("Rectangle");
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
        if (!entity.hasComponent("Rectangle")) return;
        const rectangle = entity.getComponent("Rectangle");
        this.container.removeChild(rectangle.pixi);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (!entity.hasComponent("Rectangle")) continue;
            const rectangle = entity.getComponent("Rectangle");
            if (!rectangle.pixi) continue;
            rectangle.pixi.position.set(rectangle.x, rectangle.y);
            rectangle.pixi.width = rectangle.width;
            rectangle.pixi.height = rectangle.height;
        }
    }
}
