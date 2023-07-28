import { System } from './System.js';
import { Components } from '../components/Components.js';

export class BindScoreToText extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Score, Components.Text);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const score = entity.getComponent(Components.Score);
            const text = entity.getComponent(Components.Text);
            text.text = score.value ? score.value.toString() : '0';
        }
    }
}