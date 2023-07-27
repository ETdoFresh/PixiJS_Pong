import { System } from './System.js';
import { Components } from '../components/Components.js';

export class MoveBall extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Ball, Components.Rectangle);
    }

    loop(delta) {
        const entities = this.queryEntities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const ball = entity.getComponent(Components.Ball);
            const rectangle = entity.getComponent(Components.Rectangle);
            rectangle.x += ball.velocity.x * delta;
            rectangle.y += ball.velocity.y * delta;
        }
    }
}
