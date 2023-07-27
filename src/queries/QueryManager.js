export class QueryManager {
    constructor(app) {
        this.app = app;
    }

    getEntities() {
        if (!this.app) return [];
        if (!this.app.sceneManager) return [];
        if (!this.app.sceneManager.scene) return [];
        if (!this.app.sceneManager.scene.entities) return [];

        const allEntities = this.app.sceneManager.scene.entities;
        if (arguments.length === 0) return allEntities;

        var components = [];
        for (let i = 0; i < arguments.length; i++) {
            components.push(arguments[i]);
        }

        var entities = [];
        for (let i = 0; i < allEntities.length; i++) {
            const entity = allEntities[i];
            var hasComponents = true;
            for (let j = 0; j < components.length; j++) {
                const component = components[j];
                if (!entity.hasComponent(component)) {
                    hasComponents = false;
                    break;
                }
            }
            if (hasComponents) {
                entities.push(entity);
            }
        }
        return entities;
    }

    getEntity() {
        if (!this.app) return null;
        if (!this.app.sceneManager) return null;
        if (!this.app.sceneManager.scene) return null;
        if (!this.app.sceneManager.scene.entities) return null;

        const allEntities = this.app.sceneManager.scene.entities;
        if (arguments.length === 0) return null;

        var components = [];
        for (let i = 0; i < arguments.length; i++) {
            components.push(arguments[i]);
        }

        for (let i = 0; i < allEntities.length; i++) {
            const entity = allEntities[i];
            var hasComponents = true;
            for (let j = 0; j < components.length; j++) {
                const component = components[j];
                if (!entity.hasComponent(component)) {
                    hasComponents = false;
                    break;
                }
            }
            if (hasComponents) {
                return entity;
            }
        }
        return null;
    }
}