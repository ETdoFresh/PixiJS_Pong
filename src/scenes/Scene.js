export class Scene { 
    constructor(app) { 
        this.entities = [];
        this.systems = {};
        this.app = app;
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.app.runners.entityAdded.run(entity);
    }

    removeEntity(entity) {
        const ind = this.entities.indexOf(entity);
        if (ind >= 0) {
            this.entities.splice(ind, 1);
        }
        this.app.runners.entityRemoved.run(entity);
    }

    addSystem(name, classRef) {
        this.systems[name] = new classRef(this.app);
        for (let key in this.app.runners) {
            this.app.runners[key].add(this.systems[name]);
        }
    }

    removeSystem(name) {
        for (let key in this.app.runners) {
            this.app.runners[key].remove(this.systems[name]);
        }
        delete this.systems[name];
    }

    loadEntities() { }
    loadSystems() { }
}