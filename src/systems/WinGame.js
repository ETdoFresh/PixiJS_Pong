import { System } from './System.js';
import { Components } from '../components/Components.js';

export class WinGame extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Score);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const score = entity.getComponent(Components.Score);
            if (score.value >= 11) {
                this.app.sceneManager.restartScene();
            }
        }
    }
}