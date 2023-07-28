export class System {
    constructor(app) {
        this.app = app;
    }

    get container() {
        return this.app.sceneManager.container;
    }

    get queryEntities() {
        return this.app.queryManager.getEntities();
    }

    entityAdded(entity) { }
    entityRemoved(entity) { }
    loop(delta) { }
}
