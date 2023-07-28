export class Entity { 
    constructor(components) { 
        this.components = components;
    }

    hasComponent(component) {
        return this.components.hasOwnProperty(component);
    }

    getComponent(component) {
        return this.hasComponent(component) ? this.components[component] : null;
    }
}