import { SceneManager } from "./scenes/SceneManager.js";
import { QueryManager } from "./queries/QueryManager.js";
import { PongScene } from "./scenes/PongScene.js"; 

export class Application {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 858,
            height: 525,
            backgroundColor: 0x020202
        });
        this.root = new PIXI.Container();

        this.ticker = new PIXI.Ticker();
        this.ticker.add(() => {
            this.render();
        }, -25);

        this.runners = {
            entityAdded: new PIXI.Runner("entityAdded"),
            entityRemoved: new PIXI.Runner("entityRemoved"),
            loop: new PIXI.Runner("loop")
        };

        this.sceneManager = new SceneManager(this);
        this.queryManager = new QueryManager(this);
    }

    get view() {
        return this.renderer.view;
    }

    async start() {
        this.ticker.start();
        this.sceneManager.loadScene(PongScene);
    }

    render() {
        this.renderer.render(this.root);
    }

    destroy() {
        this.ticker.destroy();
        this.renderer.destroy();
    }
}