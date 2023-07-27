import { System } from './System.js';
import { Components } from '../components/Components.js';

export class ListenForInput extends System {
    get queryEntities() {
        return this.app.queryManager.getEntities(Components.Input);
    }

    entityAdded(entity) {
        const input = entity.getComponent(Components.Input);
        if (!input) return;
        input.keys = {};
        input.onKeyDown = (event) => { input.keys[event.key] = true; };
        input.onKeyUp = (event) => { input.keys[event.key] = false; };
        window.addEventListener('keydown', input.onKeyDown);
        window.addEventListener('keyup', input.onKeyUp);
    }

    entityRemoved(entity) {
        const input = entity.getComponent(Components.Input);
        if (!input) return;
        window.removeEventListener('keydown', input.onKeyDown);
        window.removeEventListener('keyup', input.onKeyUp);
    }
}