export class SceneManager {
    constructor(app) {
        this.app = app;
        this.active = null;
        this.app.ticker.add(() => {
            if (this.ticker) {
                this.ticker.update();
            }
        });
        this.reset();
    }

    reset() {
        if (this.container) {
            this.container.destroy({ children: true });
        }
        this.container = new PIXI.Container();
        this.ticker = new PIXI.Ticker();
        this.app.root.addChildAt(this.container, 0);
        this.ticker.add((delta) => {
            this.app.runners.loop.run(delta);
        });
    }

    loadScene(scene) {
        this.reset();
        this.scene = new scene(this.app)
        this.scene.loadSystems();
        this.scene.loadEntities();
    }
}