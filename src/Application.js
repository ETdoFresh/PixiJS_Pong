import * as PIXI from "/src/pixi.mjs";
import { DummyPhys } from "./systems/DummyPhys.js";
import { Game } from "./systems/Game.js";
import { Menu } from "./systems/Menu.js";
import { Pack } from "./systems/Pack.js";
import { Visual } from "./systems/Visual.js";

export class Application {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 720,
            height: 1280,
            backgroundColor: 0xffc0cb
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

        this.addSystem("game", Game);
        this.addSystem("pack", Pack);
        this.addSystem("menu", Menu);
        this.addSystem("visual", Visual);
        this.addSystem("dummyPhys", DummyPhys);
    }

    addSystem(name, classRef) {
        this[name] = new classRef(this);
        for (let key in this.runners) {
            this.runners[key].add(this[name]);
        }
    }

    get view() {
        return this.renderer.view;
    }

    async start() {
        this.ticker.start();
        await this.pack.start();
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.menu.start();
        this.game.initLevel(this.pack.allLevels[0]);
    }

    render() {
        this.renderer.render(this.root);
    }

    destroy() {
        this.ticker.destroy();
        this.renderer.destroy();
    }
}
